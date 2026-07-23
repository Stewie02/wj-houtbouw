import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import {
  ContainerRegistrationKeys,
  MedusaError,
  QueryContext,
} from "@medusajs/framework/utils"

// Public product feed for Google Merchant Center and Meta Commerce Manager.
// Both platforms poll this URL on their own schedule, so it is rendered per
// request — no cache, no scheduled job, always current.
// Spec: https://support.google.com/merchants/answer/7052112

const BRAND = "W&J Houtbouw"
const CONDITION = "new"
// Handmade, made to order: nothing is ever tracked as out of stock.
const AVAILABILITY = "in_stock"
// ponytail: 21% BTW constant — furniture is always the Dutch standard rate.
// Only applied when prices are stored tax-exclusive.
const VAT_RATE = 0.21

const MAX_TITLE = 150
const MAX_DESCRIPTION = 5000
const MAX_PRODUCT_TYPE = 750
const MAX_ADDITIONAL_IMAGES = 10

type CalculatedPrice = {
  calculated_amount?: number | null
  original_amount?: number | null
  is_calculated_price_tax_inclusive?: boolean | null
}

type FeedProduct = {
  id: string
  handle: string
  title: string
  subtitle?: string | null
  description?: string | null
  thumbnail?: string | null
  images?: { url: string }[] | null
  categories?: { name: string }[] | null
  variants?: { calculated_price?: CalculatedPrice | null }[] | null
}

const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
}

export const escapeXml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char])

// Descriptions are authored in Markdown and rendered with react-markdown on the
// storefront. Google wants plain text, so the syntax is flattened rather than
// shipped as literal asterisks and hashes.
export const stripMarkdown = (markdown: string): string =>
  markdown
    .replace(/\r/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^[ \t]{0,3}#{1,6}[ \t]+/gm, "")
    .replace(/^[ \t]{0,3}>[ \t]?/gm, "")
    .replace(/^[ \t]*[-*+][ \t]+/gm, "")
    .replace(/^[ \t]*\d+\.[ \t]+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

// "1249.00 EUR" — period decimal separator, ISO 4217 code, tax included.
export const formatPrice = (
  amount: number,
  currencyCode: string,
  taxInclusive: boolean
): string => {
  const gross = taxInclusive ? amount : amount * (1 + VAT_RATE)
  return `${gross.toFixed(2)} ${currencyCode.toUpperCase()}`
}

const truncate = (value: string, max: number): string =>
  value.length > max ? value.slice(0, max).trimEnd() : value

const tag = (name: string, value: string): string =>
  `      <${name}>${escapeXml(value)}</${name}>`

// CDATA preserves line breaks and special characters as-is, which Google
// otherwise strips from a plain <description>. The replace guards the one
// sequence that can't appear inside CDATA: a literal "]]>".
export const cdataTag = (name: string, value: string): string =>
  `      <${name}><![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]></${name}>`

const buildItem = (
  product: FeedProduct,
  storefrontUrl: string,
  currencyCode: string
): string | null => {
  const price = product.variants?.[0]?.calculated_price
  const amount = price?.calculated_amount

  const images = (product.images ?? []).map((image) => image.url)
  const imageLink = product.thumbnail ?? images[0]

  // Google rejects items without a price or an image; skip them here so the
  // feed stays clean instead of collecting diagnostics.
  if (amount == null || !imageLink) {
    return null
  }

  const taxInclusive = price?.is_calculated_price_tax_inclusive ?? false
  const description = product.description || product.subtitle || product.title
  const productType = (product.categories ?? [])
    .map((category) => category.name)
    .join(" > ")

  // g:price is the regular price, g:sale_price the discounted one. The feed
  // queries without a customer, so this only ever reflects public price lists —
  // never a logged-in customer's personal discount.
  const original = price?.original_amount
  const onSale = original != null && amount < original

  const lines = [
    tag("g:id", product.id),
    tag("title", truncate(product.title, MAX_TITLE)),
    cdataTag("description", truncate(stripMarkdown(description), MAX_DESCRIPTION)),
    // The public product URL is the Dutch one — /producten/:handle is rewritten
    // to /products/:handle and is what the storefront sets as canonical.
    tag("link", `${storefrontUrl}/producten/${product.handle}`),
    tag("g:image_link", imageLink),
    ...images
      .filter((url) => url !== imageLink)
      .slice(0, MAX_ADDITIONAL_IMAGES)
      .map((url) => tag("g:additional_image_link", url)),
    tag("g:availability", AVAILABILITY),
    tag(
      "g:price",
      formatPrice(onSale ? original! : amount, currencyCode, taxInclusive)
    ),
    ...(onSale
      ? [tag("g:sale_price", formatPrice(amount, currencyCode, taxInclusive))]
      : []),
    tag("g:brand", BRAND),
    tag("g:condition", CONDITION),
    // No GTIN and no manufacturer MPN exist for handmade furniture.
    tag("g:identifier_exists", "no"),
  ]

  if (productType) {
    lines.push(tag("g:product_type", truncate(productType, MAX_PRODUCT_TYPE)))
  }

  return `    <item>\n${lines.join("\n")}\n    </item>`
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const storefrontUrl = (
    process.env.STOREFRONT_URL ?? "http://localhost:8000"
  ).replace(/\/+$/, "")

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "currency_code"],
  })
  const region = regions[0] as { id: string; currency_code: string } | undefined

  if (!region) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "No region configured")
  }

  // ponytail: single query, add pagination past ~1000 products.
  const { data: products } = await query.graph({
    entity: "product",
    filters: { status: "published" },
    fields: [
      "id",
      "handle",
      "title",
      "subtitle",
      "description",
      "thumbnail",
      "images.url",
      "categories.name",
      "variants.calculated_price.*",
    ],
    context: {
      variants: {
        calculated_price: QueryContext({
          currency_code: region.currency_code,
          region_id: region.id,
        }),
      },
    },
  })

  const items = (products as unknown as FeedProduct[])
    .map((product) => buildItem(product, storefrontUrl, region.currency_code))
    .filter((item): item is string => item !== null)

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(BRAND)}</title>
    <link>${escapeXml(storefrontUrl)}</link>
    <description>Productfeed</description>
${items.join("\n")}
  </channel>
</rss>`

  res.setHeader("Content-Type", "application/rss+xml; charset=utf-8")
  res.send(xml)
}
