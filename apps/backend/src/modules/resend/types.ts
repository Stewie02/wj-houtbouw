import type { CustomerEmailProps } from "./emails/customer-welcome"
import type { OrderEmailProps } from "./emails/order-placed"

export type OrderConfirmationEmailData = OrderEmailProps & { type: "order-placed" }
export type CustomerWelcomeEmailData = CustomerEmailProps & { type: "customer-welcome" }

export type EmailData = OrderConfirmationEmailData | CustomerWelcomeEmailData
