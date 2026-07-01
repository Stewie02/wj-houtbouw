import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError, Modules } from "@medusajs/framework/utils"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

function parseSurcharge(raw: string): number {
  const match = raw.trim().match(/\+?€([\d]+(?:[.,]\d+)?)\s*$/)
  if (!match) return 0
  const surcharge = parseFloat(match[1].replace(",", "."))
  return isNaN(surcharge) ? 0 : surcharge
}

type AddItemBody = {
  variantId: string
  quantity?: number
  selectedOptions?: Record<string, string>
}

export async function POST(req: MedusaRequest<AddItemBody>, res: MedusaResponse) {
  const { cartId } = req.params
  const { variantId, quantity = 1, selectedOptions = {} } = req.body

  if (!variantId) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "variantId is required")
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const pricingModule = req.scope.resolve(Modules.PRICING)
  const productModule = req.scope.resolve(Modules.PRODUCT)
  const cartModule = req.scope.resolve(Modules.CART)

  // Fetch variant info, price set, and cart currency in parallel
  const [{ data: variantData }, { data: cartData }] = await Promise.all([
    query.graph({
      entity: "product_variant",
      fields: [
        "id",
        "title",
        "product_id",
        "price_set.id",
        "product.id",
        "product.title",
        "product.handle",
        "product.thumbnail",
        "product.description",
        "product.subtitle",
      ],
      filters: { id: variantId },
    }),
    query.graph({
      entity: "cart",
      fields: ["id", "region.currency_code"],
      filters: { id: cartId },
    }),
  ])

  type VariantRow = {
    id: string
    title?: string
    product_id?: string
    price_set?: { id: string } | null
    product?: {
      id?: string
      title?: string
      handle?: string
      thumbnail?: string | null
      description?: string | null
      subtitle?: string | null
    } | null
  }

  const variant = variantData[0] as VariantRow | undefined
  const currency_code = (cartData[0] as { region?: { currency_code: string } | null })?.region?.currency_code

  if (!currency_code) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Cart region not found")
  }

  const priceSetId = variant?.price_set?.id
  let basePrice = 0
  let isTaxInclusive = false
  if (priceSetId) {
    const prices = await pricingModule.calculatePrices(
      { id: [priceSetId] },
      { context: { currency_code } }
    )
    const price = prices[0] as
      | { calculated_amount?: number | null; is_calculated_price_tax_inclusive?: boolean }
      | undefined
    basePrice = price?.calculated_amount ?? 0
    isTaxInclusive = price?.is_calculated_price_tax_inclusive ?? false
  }

  // Compute total from surcharges encoded in option value strings
  const totalSurcharge = Object.values(selectedOptions).reduce(
    (sum, raw) => sum + parseSurcharge(raw),
    0
  )
  const totalPrice = basePrice + totalSurcharge

  // Build options_label — preserve client insertion order (matches display order)
  const optionIds = Object.keys(selectedOptions)
  let options_label = ""
  if (optionIds.length > 0) {
    const options = await productModule.listProductOptions(
      { id: optionIds },
      { select: ["id", "title"] }
    )
    const titleById = new Map(
      (options as Array<{ id: string; title: string }>).map((o) => [o.id, o.title])
    )
    options_label = optionIds
      .map((id) => {
        const title = titleById.get(id) ?? id
        const value = (selectedOptions[id] ?? "").replace(/\s*\+?€[\d.,]+\s*$/, "").trim()
        return `${title}: ${value}`
      })
      .join(", ")
  }

  // Add line item directly — full control over unit_price, is_custom_price, metadata
  await cartModule.addLineItems(cartId, [{
    variant_id: variantId,
    quantity,
    title: variant?.product?.title ?? variant?.title ?? "Product",
    product_id: variant?.product_id ?? undefined,
    product_title: variant?.product?.title ?? undefined,
    product_handle: variant?.product?.handle ?? undefined,
    product_description: variant?.product?.description ?? undefined,
    product_subtitle: variant?.product?.subtitle ?? undefined,
    thumbnail: variant?.product?.thumbnail ?? undefined,
    unit_price: totalPrice,
    is_custom_price: true,
    is_tax_inclusive: isTaxInclusive,
    metadata: { options_label },
  }])

  res.json({ success: true })
}
