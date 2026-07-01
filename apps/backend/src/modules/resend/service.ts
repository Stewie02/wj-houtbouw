import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
import { Resend } from "resend"
import { CustomerWelcomeEmail } from "./emails/customer-welcome"
import { OrderPlacedEmail } from "./emails/order-placed"
import { WithdrawalRequestEmail } from "./emails/withdrawal-request"
import { WithdrawalConfirmedEmail } from "./emails/withdrawal-confirmed"
import { WithdrawalAdminEmail } from "./emails/withdrawal-admin"
import type { EmailData } from "./types"

type ResendOptions = {
  api_key: string
  from: string
}

type SendNotificationInput = {
  to: string
  channel: string
  template: string
  data?: Record<string, unknown> | null
  from?: string | null
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "notification-resend"

  private resendClient: Resend
  private options: ResendOptions

  constructor(_: Record<string, unknown>, options: ResendOptions) {
    super()
    this.options = options
    this.resendClient = new Resend(options.api_key)
  }

  static validateOptions(options: Record<string, unknown>) {
    if (!options.api_key) {
      throw new Error("Resend notification provider: api_key is required")
    }
    if (!options.from) {
      throw new Error("Resend notification provider: from is required")
    }
  }

  private getReactTemplate(data: EmailData) {
    switch (data.type) {
      case "order-placed":
        return OrderPlacedEmail(data)
      case "customer-welcome":
        return CustomerWelcomeEmail(data)
      case "withdrawal-request":
        return WithdrawalRequestEmail(data)
      case "withdrawal-confirmed":
        return WithdrawalConfirmedEmail(data)
      case "withdrawal-admin":
        return WithdrawalAdminEmail(data)
    }
  }

  private getSubject(data: EmailData): string {
    switch (data.type) {
      case "order-placed":
        return `Bevestiging van je bestelling #${data.display_id ?? ""}`
      case "customer-welcome":
        return "Welkom bij W&J Houtbouw"
      case "withdrawal-request":
        return `Bevestig uw herroeping van bestelling #${data.display_id ?? ""}`
      case "withdrawal-confirmed":
        return `Uw herroeping is bevestigd — bestelling #${data.display_id ?? ""}`
      case "withdrawal-admin":
        return `Herroeping bevestigd — bestelling #${data.display_id ?? ""}`
    }
  }

  async send(notification: SendNotificationInput): Promise<{ id?: string }> {
    const data = notification.data as unknown as EmailData

    if (!data?.type) {
      return {}
    }

    const template = this.getReactTemplate(data)

    const attachments: Array<{ filename: string; content: Buffer }> = []
    if (
      data.type === "order-placed" &&
      data.invoice_pdf_base64
    ) {
      attachments.push({
        filename: `factuur-${data.display_id ?? "bestelling"}.pdf`,
        content: Buffer.from(data.invoice_pdf_base64, "base64"),
      })
    }

    const BCC_ADDRESS = "info@wjhoutbouw.nl"
    const recipient = process.env.RESEND_TEST_EMAIL ?? notification.to
    const bcc = recipient !== BCC_ADDRESS ? BCC_ADDRESS : undefined

    const { data: result, error } = await this.resendClient.emails.send({
      from: this.options.from,
      to: recipient,
      bcc,
      subject: this.getSubject(data),
      react: template,
      ...(attachments.length > 0 && { attachments }),
    })

    if (error) {
      throw new Error(
        `Resend [${error.name ?? "unknown"}/${(error as { statusCode?: number }).statusCode ?? "?"}]: ${error.message}`
      )
    }

    return { id: result?.id }
  }
}

export default ResendNotificationProviderService
