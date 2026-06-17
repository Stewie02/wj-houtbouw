import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import type {
  WithdrawalConfirmedEmailData,
} from "../modules/resend/types"
import { sendNotificationStep } from "./steps/send-notification"

type Input = { order_id: string }

const sendWithdrawalConfirmedWorkflow = createWorkflow(
  "send-withdrawal-confirmed",
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

      const confirmedAt =
        (order.metadata?.withdrawal_confirmed_at as string) ??
        new Date().toISOString()

      const emailData: WithdrawalConfirmedEmailData = {
        type: "withdrawal-confirmed",
        email: order.email,
        display_id: order.display_id,
        confirmed_at: confirmedAt,
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

export default sendWithdrawalConfirmedWorkflow
