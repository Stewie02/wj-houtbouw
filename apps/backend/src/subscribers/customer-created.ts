import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import sendCustomerWelcomeWorkflow from "../workflows/send-customer-welcome"

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")

  logger.info(`[customer.created] Sending welcome email for customer: ${data.id}`)

  try {
    await sendCustomerWelcomeWorkflow(container).run({
      input: { customer_id: data.id },
    })
    logger.info(`[customer.created] Welcome email sent for customer: ${data.id}`)
  } catch (error) {
    logger.error(
      `[customer.created] Failed to send welcome email for customer ${data.id}: ${(error as Error).message}`
    )
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}
