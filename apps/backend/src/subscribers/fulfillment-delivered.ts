import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function fulfillmentDeliveredHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")
  const fulfillmentId = data.id

  logger.info(`[delivery.created] Fulfillment delivered: ${fulfillmentId}`)

  try {
    const query = container.resolve("query")

    const { data: orders } = await query.graph({
      entity: "order",
      fields: ["id", "metadata"],
      filters: {
        fulfillments: { id: fulfillmentId } as unknown as undefined,
      },
    })

    const order = orders[0] as
      | { id: string; metadata: Record<string, unknown> | null }
      | undefined

    if (!order) {
      logger.warn(
        `[delivery.created] No order found for fulfillment ${fulfillmentId}`
      )
      return
    }

    const orderModuleService = container.resolve(Modules.ORDER)
    await orderModuleService.updateOrders([
      {
        id: order.id,
        metadata: {
          ...(order.metadata ?? {}),
          delivered_at: new Date().toISOString(),
        },
      },
    ])

    logger.info(
      `[delivery.created] Set delivered_at on order ${order.id}`
    )
  } catch (error) {
    logger.error(
      `[delivery.created] Failed for fulfillment ${fulfillmentId}: ${(error as Error).message}`
    )
  }
}

export const config: SubscriberConfig = {
  event: "delivery.created",
}
