import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import sendOrderConfirmationWorkflow from "../workflows/send-order-confirmation"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")

  logger.info(`[order.placed] Sending confirmation for order: ${data.id}`)

  try {
    await sendOrderConfirmationWorkflow(container).run({
      input: { order_id: data.id },
    })
    logger.info(`[order.placed] Confirmation sent for order: ${data.id}`)
  } catch (error) {
    logger.error(
      `[order.placed] Failed to send confirmation for order ${data.id}: ${(error as Error).message}`
    )
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
