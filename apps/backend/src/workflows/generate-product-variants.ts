import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

type ParsedValue = { raw: string; surcharge: number }
type ParsedOption = { id: string; title: string; values: ParsedValue[] }
type ComboItem = { optionTitle: string; value: string; surcharge: number }
type PriceUpdate = { variantId: string; priceSetId: string; price: number }

function parseSurcharge(raw: string): number {
  const match = raw.trim().match(/\+?€([\d]+(?:[.,]\d+)?)\s*$/)
  if (!match) return 0
  const surcharge = parseFloat(match[1].replace(",", "."))
  return isNaN(surcharge) ? 0 : surcharge
}

function cartesian<T>(arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
    [[]]
  )
}

// Strip price suffix so "200 cm +€40" and "200 cm +€50" both fingerprint as "200 cm"
function stripPrice(raw: string): string {
  return raw.replace(/\s*\+?€[\d.,]+\s*$/, "").trim()
}

// Stable fingerprint — sorted by option title, price suffix stripped
function comboFingerprint(combo: ComboItem[]): string {
  return combo
    .slice()
    .sort((a, b) => a.optionTitle.localeCompare(b.optionTitle))
    .map((v) => `${v.optionTitle}::${stripPrice(v.value)}`)
    .join("|")
}

function variantFingerprint(
  optionValues: Array<{ option_id: string; value: string }>,
  optionTitleById: Map<string, string>
): string {
  return optionValues
    .map((ov) => ({
      title: optionTitleById.get(ov.option_id) ?? ov.option_id,
      value: stripPrice(ov.value),
    }))
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((ov) => `${ov.title}::${ov.value}`)
    .join("|")
}

// Fetches current product options and parses surcharges from value strings.
const fetchOptionsStep = createStep(
  "fetch-options",
  async ({ productId }: { productId: string }, { container }) => {
    const productModule = container.resolve(Modules.PRODUCT)

    const rawOptions = await productModule.listProductOptions(
      { product_id: productId },
      { select: ["id", "title"], relations: ["values"] }
    )

    const options: ParsedOption[] = rawOptions.map(
      (opt: {
        id: string
        title: string
        values: Array<{ id: string; value: string }>
      }) => ({
        id: opt.id,
        title: opt.title,
        values: opt.values.map((val) => ({
          raw: val.value,
          surcharge: parseSurcharge(val.value),
        })),
      })
    )

    return new StepResponse({ options })
  }
)

// Upserts all variant combinations:
// - Existing combo (same option values) → update price, keep variant ID
// - New combo → create variant + price set
// - Old combo no longer in set → soft-delete
const upsertVariantsStep = createStep(
  "upsert-variants",
  async (
    {
      productId,
      basePrice,
      options,
    }: { productId: string; basePrice: number; options: ParsedOption[] },
    { container }
  ) => {
    const productModule = container.resolve(Modules.PRODUCT)
    const pricingModule = container.resolve(Modules.PRICING)
    const remoteLink = container.resolve(ContainerRegistrationKeys.LINK)
    const query = container.resolve(ContainerRegistrationKeys.QUERY)

    // Build optionId -> title map for fingerprinting existing variants
    const optionTitleById = new Map(options.map((o) => [o.id, o.title]))

    // Fetch current active variants with their option values
    const currentVariants = await productModule.listProductVariants(
      { product_id: productId },
      { select: ["id"], relations: ["options"] }
    )

    // Fetch linked price set ID per variant
    const currentVariantIds = currentVariants.map((v: { id: string }) => v.id)
    let priceSetByVariantId = new Map<string, string>()

    if (currentVariantIds.length > 0) {
      const { data: variantsWithPriceSet } = await query.graph({
        entity: "product_variant",
        fields: ["id", "price_set.id"],
        filters: { id: currentVariantIds },
      })
      priceSetByVariantId = new Map(
        (variantsWithPriceSet as Array<{ id: string; price_set: { id: string } | null }>)
          .filter((v) => v.price_set != null)
          .map((v) => [v.id, v.price_set!.id])
      )
    }

    // Build fingerprint → { variantId, priceSetId } for existing variants
    const existingByFingerprint = new Map<
      string,
      { variantId: string; priceSetId: string | undefined }
    >()
    for (const variant of currentVariants as Array<{
      id: string
      options: Array<{ option_id: string; value: string }>
    }>) {
      const fp = variantFingerprint(variant.options, optionTitleById)
      existingByFingerprint.set(fp, {
        variantId: variant.id,
        priceSetId: priceSetByVariantId.get(variant.id),
      })
    }

    // Generate all new combinations
    const axes = options.map((opt) =>
      opt.values.map((val) => ({
        optionTitle: opt.title,
        value: val.raw,
        surcharge: val.surcharge,
      }))
    )
    const combinations = cartesian(axes)

    const touchedVariantIds = new Set<string>()
    const toUpdatePrices: PriceUpdate[] = []
    const toCreate: Array<{ combo: ComboItem[]; price: number }> = []
    const toCreatePriceLink: Array<{ variantId: string; price: number }> = []

    for (const combo of combinations) {
      const fp = comboFingerprint(combo)
      const price = basePrice + combo.reduce((sum, v) => sum + v.surcharge, 0)
      const existing = existingByFingerprint.get(fp)

      if (existing) {
        touchedVariantIds.add(existing.variantId)
        if (existing.priceSetId) {
          toUpdatePrices.push({ variantId: existing.variantId, priceSetId: existing.priceSetId, price })
        } else {
          toCreatePriceLink.push({ variantId: existing.variantId, price })
        }
      } else {
        toCreate.push({ combo, price })
      }
    }

    // Update prices: dismiss old link → delete old price set → create new → re-link
    if (toUpdatePrices.length > 0) {
      await remoteLink.dismiss(
        toUpdatePrices.map(({ variantId, priceSetId }) => ({
          [Modules.PRODUCT]: { variant_id: variantId },
          [Modules.PRICING]: { price_set_id: priceSetId },
        }))
      )
      await pricingModule.deletePriceSets(
        toUpdatePrices.map((u) => u.priceSetId)
      )
      const replacedPriceSets = await pricingModule.createPriceSets(
        toUpdatePrices.map(({ price }) => ({
          prices: [{ amount: price, currency_code: "eur" }],
        }))
      )
      await remoteLink.create(
        toUpdatePrices.map(({ variantId }, idx) => ({
          [Modules.PRODUCT]: { variant_id: variantId },
          [Modules.PRICING]: { price_set_id: replacedPriceSets[idx].id },
        }))
      )
    }

    // Create new variants + price sets in batches
    const BATCH_SIZE = 100
    const createdVariantIds: string[] = []
    const createdPriceSetIds: string[] = []

    for (let i = 0; i < toCreate.length; i += BATCH_SIZE) {
      const batch = toCreate.slice(i, i + BATCH_SIZE)

      const newVariants = await productModule.createProductVariants(
        batch.map(({ combo }) => ({
          product_id: productId,
          title: combo.map((v) => v.value.trim()).join(" / "),
          manage_inventory: false,
          options: Object.fromEntries(combo.map((v) => [v.optionTitle.trim(), v.value.trim()])),
        }))
      )

      const newPriceSets = await pricingModule.createPriceSets(
        batch.map(({ price }) => ({
          prices: [{ amount: price, currency_code: "eur" }],
        }))
      )

      await remoteLink.create(
        newVariants.map((v: { id: string }, idx: number) => ({
          [Modules.PRODUCT]: { variant_id: v.id },
          [Modules.PRICING]: { price_set_id: newPriceSets[idx].id },
        }))
      )

      newVariants.forEach((v: { id: string }) => {
        touchedVariantIds.add(v.id)
        createdVariantIds.push(v.id)
      })
      newPriceSets.forEach((ps: { id: string }) =>
        createdPriceSetIds.push(ps.id)
      )
    }

    // Create price sets for existing variants that had no price link
    if (toCreatePriceLink.length > 0) {
      const newPriceSets = await pricingModule.createPriceSets(
        toCreatePriceLink.map(({ price }) => ({
          prices: [{ amount: price, currency_code: "eur" }],
        }))
      )
      await remoteLink.create(
        toCreatePriceLink.map(({ variantId }, idx) => ({
          [Modules.PRODUCT]: { variant_id: variantId },
          [Modules.PRICING]: { price_set_id: newPriceSets[idx].id },
        }))
      )
    }

    // Soft-delete variants no longer in any combination
    const staleIds = currentVariantIds.filter(
      (id: string) => !touchedVariantIds.has(id)
    )
    if (staleIds.length > 0) {
      await productModule.softDeleteProductVariants(staleIds)
    }

    return new StepResponse(
      {
        created: toCreate.length,
        updated: toUpdatePrices.length + toCreatePriceLink.length,
        archived: staleIds.length,
      },
      { variantIds: createdVariantIds, priceSetIds: createdPriceSetIds }
    )
  },
  async (
    {
      variantIds,
      priceSetIds,
    }: { variantIds: string[]; priceSetIds: string[] },
    { container }
  ) => {
    const productModule = container.resolve(Modules.PRODUCT)
    const pricingModule = container.resolve(Modules.PRICING)
    if (variantIds.length > 0) {
      await productModule.softDeleteProductVariants(variantIds)
    }
    if (priceSetIds.length > 0) {
      await pricingModule.deletePriceSets(priceSetIds)
    }
  }
)

export const generateProductVariantsWorkflow = createWorkflow(
  "generate-product-variants",
  function ({
    productId,
    basePrice,
  }: {
    productId: string
    basePrice: number
  }) {
    const { options } = fetchOptionsStep({ productId })
    const result = upsertVariantsStep({ productId, basePrice, options })
    return new WorkflowResponse(result)
  }
)
