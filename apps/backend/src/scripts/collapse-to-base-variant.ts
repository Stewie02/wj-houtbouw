import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

type PriceRow = { variant_id: string; price_set_id: string; min_price: string | null }

const BATCH = 50

function chunks<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default async function collapseToBaseVariant({ container }: ExecArgs) {
  const productModule = container.resolve(Modules.PRODUCT)
  const pricingModule = container.resolve(Modules.PRICING)
  const remoteLink = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const logger = container.resolve("logger")
  const pgConnection = container.resolve("__pg_connection__") as {
    raw: (sql: string, bindings?: unknown[]) => Promise<{ rows: PriceRow[] }>
  }

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title"],
  })

  logger.info(`[collapse-variants] Processing ${products.length} products`)

  for (const product of products as Array<{ id: string; title: string }>) {
    const variants = await productModule.listProductVariants(
      { product_id: product.id },
      { select: ["id"] }
    )

    if (variants.length === 0) {
      logger.info(`[collapse-variants] ${product.title}: no variants, skipping`)
      continue
    }

    // Skip if already collapsed (1 variant titled "Standaard")
    if (variants.length === 1) {
      const v = await productModule.listProductVariants(
        { id: variants[0].id },
        { select: ["id", "title"] }
      )
      if ((v[0] as { title?: string })?.title === "Standaard") {
        logger.info(`[collapse-variants] ${product.title}: already collapsed, skipping`)
        continue
      }
    }

    const variantIds = variants.map((v: { id: string }) => v.id)
    logger.info(`[collapse-variants] ${product.title}: ${variantIds.length} variants`)

    // Fetch min price and price set IDs in batches to avoid huge IN clauses
    let minPrice = 0
    const allRows: PriceRow[] = []

    for (const batch of chunks(variantIds, BATCH)) {
      const placeholders = batch.map(() => "?").join(",")
      const { rows } = await pgConnection.raw(
        `SELECT pv.id AS variant_id, pvps.price_set_id,
                MIN(p.amount) OVER (PARTITION BY pv.product_id) AS min_price
         FROM product_variant pv
         LEFT JOIN product_variant_price_set pvps ON pvps.variant_id = pv.id AND pvps.deleted_at IS NULL
         LEFT JOIN price p ON p.price_set_id = pvps.price_set_id AND p.deleted_at IS NULL AND p.price_list_id IS NULL
         WHERE pv.id IN (${placeholders})
           AND pv.deleted_at IS NULL`,
        batch
      )
      allRows.push(...rows)
    }

    // Take min across all batches
    for (const row of allRows) {
      if (row.min_price != null) {
        const v = parseFloat(row.min_price)
        if (minPrice === 0 || v < minPrice) minPrice = v
      }
    }

    const linkRows = allRows.filter((r) => r.price_set_id)
    const priceSetIds = [...new Set(linkRows.map((r) => r.price_set_id))]

    logger.info(`[collapse-variants] ${product.title}: base price €${minPrice}, dismissing ${linkRows.length} links`)

    // Dismiss links in batches
    for (const batch of chunks(linkRows, BATCH)) {
      await remoteLink.dismiss(
        batch.map((r) => ({
          [Modules.PRODUCT]: { variant_id: r.variant_id },
          [Modules.PRICING]: { price_set_id: r.price_set_id },
        }))
      )
    }

    // Soft-delete variants in batches
    for (const batch of chunks(variantIds, BATCH)) {
      await productModule.softDeleteProductVariants(batch)
    }

    // Delete price sets in batches
    for (const batch of chunks(priceSetIds, BATCH)) {
      await pricingModule.deletePriceSets(batch)
    }

    // Create single "Standaard" variant with base price
    const [newVariant] = await productModule.createProductVariants([{
      product_id: product.id,
      title: "Standaard",
      manage_inventory: false,
    }])

    const [newPriceSet] = await pricingModule.createPriceSets([{
      prices: [{ amount: minPrice, currency_code: "eur" }],
    }])

    await remoteLink.create([{
      [Modules.PRODUCT]: { variant_id: newVariant.id },
      [Modules.PRICING]: { price_set_id: newPriceSet.id },
    }])

    logger.info(`[collapse-variants] ${product.title}: done`)
  }

  logger.info("[collapse-variants] All products processed")
}
