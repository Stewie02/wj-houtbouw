import type { CustomerEmailProps } from "./emails/customer-welcome"
import type { OrderEmailProps } from "./emails/order-placed"
import type { WithdrawalRequestEmailProps } from "./emails/withdrawal-request"
import type { WithdrawalConfirmedEmailProps } from "./emails/withdrawal-confirmed"
import type { WithdrawalAdminEmailProps } from "./emails/withdrawal-admin"

export type OrderConfirmationEmailData = OrderEmailProps & {
  type: "order-placed"
  invoice_pdf_base64?: string
}
export type CustomerWelcomeEmailData = CustomerEmailProps & { type: "customer-welcome" }

export type WithdrawalRequestEmailData = WithdrawalRequestEmailProps & {
  type: "withdrawal-request"
}
export type WithdrawalConfirmedEmailData = WithdrawalConfirmedEmailProps & {
  type: "withdrawal-confirmed"
}
export type WithdrawalAdminEmailData = WithdrawalAdminEmailProps & {
  type: "withdrawal-admin"
}

export type EmailData =
  | OrderConfirmationEmailData
  | CustomerWelcomeEmailData
  | WithdrawalRequestEmailData
  | WithdrawalConfirmedEmailData
  | WithdrawalAdminEmailData
