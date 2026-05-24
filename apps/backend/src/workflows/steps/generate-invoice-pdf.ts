import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { renderInvoice, type InvoiceOrder } from "../../lib/invoice-pdf"

type Input = {
  orders: unknown[]
}

export const generateInvoicePdfStep = createStep(
  "generate-invoice-pdf",
  async (input: Input) => {
    const order = input.orders[0] as InvoiceOrder | undefined
    if (!order) return new StepResponse(null)

    const buffer = await renderInvoice(order)
    return new StepResponse(buffer.toString("base64"))
  }
)
