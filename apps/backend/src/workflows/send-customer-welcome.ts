import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"
import type { CustomerDTO } from "@medusajs/types"
import type { CustomerWelcomeEmailData } from "../modules/resend/types"
import { sendNotificationStep } from "./steps/send-notification"

type Input = { customer_id: string }

const sendCustomerWelcomeWorkflow = createWorkflow(
  "send-customer-welcome",
  function (input: Input) {
    const { data: customers } = useQueryGraphStep({
      entity: "customer",
      fields: ["id", "first_name", "last_name", "email"],
      filters: { id: input.customer_id } as Record<string, string>,
    })

    const notificationInput = transform(
      { customers: customers as unknown as CustomerDTO[] },
      ({ customers }) => {
        const customer = customers[0]

        const emailData: CustomerWelcomeEmailData = {
          type: "customer-welcome",
          first_name: customer?.first_name ?? null,
          last_name: customer?.last_name ?? null,
          email: customer?.email ?? "",
          account_url: `${process.env.STOREFRONT_URL ?? "http://localhost:8000"}/account`,
        }

        return {
          to: emailData.email,
          channel: "email",
          template: emailData.type,
          data: emailData as unknown as Record<string, unknown>,
        }
      }
    )

    sendNotificationStep(notificationInput)

    return new WorkflowResponse({})
  }
)

export default sendCustomerWelcomeWorkflow
