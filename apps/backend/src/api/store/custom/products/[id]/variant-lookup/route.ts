import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { Modules } from "@medusajs/framework/utils"

type VariantWithPriceSet = {
  id: string
  price_set: { id: string } | null
}

type CalculatedPriceResult = {
  calculated_amount: number | null
  original_amount: number | null
  currency_code: string | null
  calculated_price: {
    price_list_type: string | null
  } | null
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

  const optionEntries = Object.entries(optionSelections)
  let matchId: string | null = null

  if (optionEntries.length === 0) {
    const { data: first } = await query.graph({
      entity: "product_variant",
      fields: ["id"],
      filters: { product_id: id },
      pagination: { take: 1 },
    })
    matchId = (first[0] as { id: string } | undefined)?.id ?? null
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
    matchId = intersection.size > 0 ? [...intersection][0] : null
  }

  if (!matchId) {
    return res.json({ variant: null })
  }

  const [{ data: matchData }, { data: priceSetData }] = await Promise.all([
    query.graph({
      entity: "product_variant",
      fields: ["id", "manage_inventory", "allow_backorder", "inventory_quantity"],
      filters: { id: matchId },
    }),
    query.graph({
      entity: "product_variant",
      fields: ["id", "price_set.id"],
      filters: { id: matchId },
    }),
  ])

  const match = matchData[0] as unknown as {
    id: string
    manage_inventory: boolean
    allow_backorder: boolean
    inventory_quantity: number | null
  } | undefined

  if (!match) {
    return res.json({ variant: null })
  }

  const priceSetId = (priceSetData[0] as unknown as VariantWithPriceSet | undefined)?.price_set?.id

  let calculatedPriceObj: CalculatedPriceResult | null = null

  if (priceSetId) {
    const pricingService = req.scope.resolve(Modules.PRICING) as {
      calculatePrices(
        filters: { id: string[] },
        context: { context: Record<string, string> }
      ): Promise<CalculatedPriceResult[]>
    }

    const results = await pricingService.calculatePrices(
      { id: [priceSetId] },
      { context: { currency_code } }
    )

    if (results[0]?.calculated_amount != null) {
      calculatedPriceObj = results[0]
    }
  }

  res.json({
    variant: {
      id: match.id,
      manage_inventory: match.manage_inventory,
      allow_backorder: match.allow_backorder,
      inventory_quantity: match.inventory_quantity,
      calculated_price: calculatedPriceObj
        ? {
            calculated_amount: calculatedPriceObj.calculated_amount,
            original_amount: calculatedPriceObj.original_amount,
            currency_code: calculatedPriceObj.currency_code,
            calculated_price: {
              price_list_type: calculatedPriceObj.calculated_price?.price_list_type ?? null,
            },
          }
        : null,
    },
  })
}
