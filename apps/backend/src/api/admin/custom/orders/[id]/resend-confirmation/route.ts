import { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import sendOrderConfirmationWorkflow from "../../../../../../workflows/send-order-confirmation";

export async function POST(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const { id } = req.params;
  const { reason } = req.body as { reason?: string };

  if (!reason?.trim()) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Reden is verplicht"
    );
  }

  const logger = req.scope.resolve("logger");
  logger.info(
    `[resend-confirmation] Order ${id} confirmation manually resent by ${req.auth_context.actor_id}: ${reason}`
  );

  await sendOrderConfirmationWorkflow(req.scope).run({
    input: { order_id: id },
  });

  res.json({ success: true });
}
