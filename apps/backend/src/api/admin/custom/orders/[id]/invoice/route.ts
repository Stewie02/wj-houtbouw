import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import {
  renderInvoice,
  type InvoiceOrder,
} from "../../../../../../lib/invoice-pdf";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params;
  const query = req.scope.resolve("query");

  const { data: orders } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "email",
      "currency_code",
      "total",
      "subtotal",
      "item_subtotal",
      "shipping_total",
      "tax_total",
      "created_at",
      "items.*",
      "items.metadata",
      "items.tax_lines.*",
      "billing_address.*",
      "shipping_address.*",
      "customer.*",
    ],
    filters: { id },
  });

  const order = orders[0] as unknown as InvoiceOrder | undefined;
  if (!order) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      "Bestelling niet gevonden"
    );
  }

  const buffer = await renderInvoice(order);
  const pdf_base64 = buffer.toString("base64");

  res.json({
    pdf_base64,
    filename: `factuur-${order.display_id}.pdf`,
  });
}
