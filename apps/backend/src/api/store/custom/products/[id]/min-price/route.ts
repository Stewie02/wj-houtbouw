import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { Modules } from "@medusajs/framework/utils"

type VariantWithPriceSet = {
  id: string
  price_set: { id: string } | null
}

type CalculatedPriceResult = {
  calculated_amount: number | null
  currency_code: string | null
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const query = req.scope.resolve("query")

  const reqQuery = req.query as Record<string, string>
  const { region_id, ...optionSelections } = reqQuery

  if (!region_id) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "region_id is required")
  }

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "currency_code"],
    filters: { id: region_id },
  })
  const currency_code = (regions[0] as { id: string; currency_code: string } | undefined)?.currency_code
  if (!currency_code) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Region not found")
  }

  // Narrow candidate variants by partial option selections (same approach as variant-lookup)
  const optionEntries = Object.entries(optionSelections)
  let variantFilter: Record<string, unknown>

  if (optionEntries.length === 0) {
    variantFilter = { product_id: id }
  } else {
    const perOptionSets = await Promise.all(
      optionEntries.map(([option_id, value]) =>
        query.graph({
          entity: "product_variant",
          fields: ["id"],
          filters: { product_id: id, options: { option_id, value } },
        }).then(({ data }) => new Set(data.map((v) => (v as { id: string }).id)))
      )
    )
    const intersection = perOptionSets.reduce(
      (acc, set) => new Set([...acc].filter((x) => set.has(x)))
    )
    if (intersection.size === 0) {
      return res.json({ min_price: null })
    }
    variantFilter = { id: [...intersection] }
  }

  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: ["id", "price_set.id"],
    filters: variantFilter,
  })

  const priceSetIds = variants
    .map((v) => (v as unknown as VariantWithPriceSet).price_set?.id)
    .filter((psId): psId is string => !!psId)

  if (!priceSetIds.length) {
    return res.json({ min_price: null })
  }

  const pricingService = req.scope.resolve(Modules.PRICING) as {
    calculatePrices(
      filters: { id: string[] },
      context: { context: Record<string, string> }
    ): Promise<CalculatedPriceResult[]>
  }

  const prices = await pricingService.calculatePrices(
    { id: priceSetIds },
    { context: { currency_code } }
  )

  const valid = prices.filter((p) => p.calculated_amount != null)
  if (!valid.length) {
    return res.json({ min_price: null })
  }

  const min = valid.reduce((a, b) =>
    (a.calculated_amount ?? Infinity) <= (b.calculated_amount ?? Infinity) ? a : b
  )

  res.json({
    min_price: {
      calculated_amount: min.calculated_amount,
      currency_code: min.currency_code,
    },
  })
}
