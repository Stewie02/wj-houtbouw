import { MedusaContainer } from "@medusajs/framework"
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
} from "@medusajs/framework/utils"
import { createShippingOptionsWorkflow } from "@medusajs/medusa/core-flows"

export default async function shipping_province_zones({
  container,
}: {
  container: MedusaContainer
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  )

  logger.info("Updating shipping zones to province-based pricing...")

  // Use query.graph to reliably load fulfillment set with related data
  const { data: fulfillmentSetData } = await query.graph({
    entity: "fulfillment_set",
    fields: ["id", "name", "service_zones.id", "service_zones.shipping_options.id"],
  })

  logger.info(`Found ${fulfillmentSetData.length} fulfillment set(s): ${fulfillmentSetData.map((fs: { name: string }) => fs.name).join(", ")}`)

  const fulfillmentSet = fulfillmentSetData[0] as {
    id: string
    name: string
    service_zones: Array<{
      id: string
      shipping_options: Array<{ id: string }>
    }>
  }

  if (!fulfillmentSet) {
    throw new Error("No fulfillment sets found. Run the initial seed first.")
  }

  // Delete existing shipping options first (they depend on service zones)
  const shippingOptionIds = fulfillmentSet.service_zones.flatMap((zone) =>
    zone.shipping_options?.map((opt) => opt.id) ?? []
  )

  if (shippingOptionIds.length > 0) {
    logger.info(`Deleting ${shippingOptionIds.length} existing shipping option(s)...`)
    await fulfillmentModuleService.deleteShippingOptions(shippingOptionIds)
  }

  // Delete existing service zones
  const serviceZoneIds = fulfillmentSet.service_zones.map((zone) => zone.id)

  if (serviceZoneIds.length > 0) {
    logger.info(`Deleting ${serviceZoneIds.length} existing service zone(s)...`)
    await fulfillmentModuleService.deleteServiceZones(serviceZoneIds)
  }

  // Create two province-based service zones
  logger.info("Creating province-based service zones...")

  const [zoneFGD, zoneRNL] = await fulfillmentModuleService.createServiceZones([
    {
      name: "Friesland, Groningen en Drenthe",
      fulfillment_set_id: fulfillmentSet.id,
      geo_zones: [
        { type: "province", country_code: "nl", province_code: "fr" },
        { type: "province", country_code: "nl", province_code: "gr" },
        { type: "province", country_code: "nl", province_code: "dr" },
      ],
    },
    {
      name: "Rest van Nederland",
      fulfillment_set_id: fulfillmentSet.id,
      geo_zones: [
        { type: "province", country_code: "nl", province_code: "nh" },
        { type: "province", country_code: "nl", province_code: "zh" },
        { type: "province", country_code: "nl", province_code: "ut" },
        { type: "province", country_code: "nl", province_code: "ge" },
        { type: "province", country_code: "nl", province_code: "ov" },
        { type: "province", country_code: "nl", province_code: "nb" },
        { type: "province", country_code: "nl", province_code: "ze" },
        { type: "province", country_code: "nl", province_code: "li" },
        { type: "province", country_code: "nl", province_code: "fl" },
      ],
    },
  ])

  // Get shipping profile and region for price configuration
  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfile = shippingProfiles[0]

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id"],
    filters: { currency_code: "eur" },
  })
  const region = regions[0]

  // Create shipping options for each zone
  logger.info("Creating shipping options...")

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Gratis levering",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: zoneFGD.id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Gratis",
          description: "Gratis levering in Friesland, Groningen en Drenthe.",
          code: "free",
        },
        prices: [
          { currency_code: "eur", amount: 0 },
          { region_id: region.id, amount: 0 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
      {
        name: "Standaard levering",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: zoneRNL.id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standaard",
          description: "Levering buiten de regio: €50.",
          code: "standard",
        },
        prices: [
          { currency_code: "eur", amount: 50 },
          { region_id: region.id, amount: 50 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  })

  logger.info("Done. Shipping zones updated to province-based pricing.")
}
