import type { CustomerEmailProps } from "./emails/customer-welcome"
import type { OrderEmailProps } from "./emails/order-placed"

export type OrderConfirmationEmailData = OrderEmailProps & {
  type: "order-placed"
  invoice_pdf_base64?: string
}
export type CustomerWelcomeEmailData = CustomerEmailProps & { type: "customer-welcome" }

export type EmailData = OrderConfirmationEmailData | CustomerWelcomeEmailData
