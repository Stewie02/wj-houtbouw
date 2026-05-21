import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import type { OrderConfirmationEmailData } from "../modules/resend/types"
import type { OrderEmailProps } from "../modules/resend/emails/order-placed"
import { sendNotificationStep } from "./steps/send-notification"

type Input = { order_id: string }

const sendOrderConfirmationWorkflow = createWorkflow(
  "send-order-confirmation",
  function (input: Input) {
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "email",
        "currency_code",
        "total",
        "subtotal",
        "shipping_total",
        "tax_total",
        "items.*",
        "shipping_address.*",
        "customer.*",
      ],
      filters: { id: input.order_id },
    })

    const notificationInput = transform({ orders }, ({ orders }) => {
      const order = orders[0] as unknown as OrderEmailProps

      const emailData: OrderConfirmationEmailData = {
        ...order,
        type: "order-placed",
      }

      return {
        to: emailData.email ?? "",
        channel: "email",
        template: emailData.type,
        data: emailData as unknown as Record<string, unknown>,
      }
    })

    sendNotificationStep(notificationInput)

    return new WorkflowResponse({})
  }
)

export default sendOrderConfirmationWorkflow
