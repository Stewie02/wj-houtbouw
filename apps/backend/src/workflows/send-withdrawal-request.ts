import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import type { WithdrawalRequestEmailData } from "../modules/resend/types"
import { sendNotificationStep } from "./steps/send-notification"

type Input = { order_id: string }

const sendWithdrawalRequestWorkflow = createWorkflow(
  "send-withdrawal-request",
  function (input: Input) {
    const { data: orders } = useQueryGraphStep({
      entity: "order",
      fields: ["id", "display_id", "email", "metadata"],
      filters: { id: input.order_id },
    })

    const notificationInput = transform({ orders }, ({ orders }) => {
      const order = orders[0] as unknown as {
        id: string
        display_id: string | null
        email: string
        metadata: Record<string, unknown> | null
      }

      const token = order.metadata?.withdrawal_token as string
      const storefrontUrl =
        process.env.STOREFRONT_URL ?? "http://localhost:8000"
      const confirmUrl = `${storefrontUrl}/bestelling/${order.id}/herroeping/bevestig?token=${token}`

      const emailData: WithdrawalRequestEmailData = {
        type: "withdrawal-request",
        email: order.email,
        display_id: order.display_id,
        confirm_url: confirmUrl,
      }

      return {
        to: order.email,
        channel: "email",
        template: emailData.type,
        data: emailData as unknown as Record<string, unknown>,
      }
    })

    sendNotificationStep(notificationInput)

    return new WorkflowResponse({})
  }
)

export default sendWithdrawalRequestWorkflow
