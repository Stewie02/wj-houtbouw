import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError, Modules } from "@medusajs/framework/utils"
import type { INotificationModuleService } from "@medusajs/types"
import type { WithdrawalAdminEmailData } from "../../../../../../../modules/resend/types"
import sendWithdrawalConfirmedWorkflow from "../../../../../../../workflows/send-withdrawal-confirmed"

type ConfirmBody = { token: string }

export async function POST(
  req: MedusaRequest<ConfirmBody>,
  res: MedusaResponse
) {
  const { id } = req.params
  const { token } = req.body as ConfirmBody

  if (!token) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "Token ontbreekt")
  }

  const query = req.scope.resolve("query")

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "display_id", "email", "metadata"],
    filters: { id },
  })

  const order = orders[0] as unknown as {
    id: string
    display_id: string | null
    email: string
    metadata: Record<string, unknown> | null
  } | undefined

  if (!order) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Bestelling niet gevonden")
  }

  if (order.metadata?.withdrawal_status !== "requested") {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Geen openstaand herroepingsverzoek gevonden"
    )
  }

  if (order.metadata?.withdrawal_token !== token) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Ongeldige bevestigingslink"
    )
  }

  const now = new Date().toISOString()

  const orderModuleService = req.scope.resolve(Modules.ORDER)
  await orderModuleService.updateOrders([
    {
      id,
      metadata: {
        ...(order.metadata ?? {}),
        withdrawal_status: "confirmed",
        withdrawal_confirmed_at: now,
        withdrawal_token: null,
      },
    },
  ])

  await sendWithdrawalConfirmedWorkflow(req.scope).run({
    input: { order_id: id },
  })

  const adminEmailData: WithdrawalAdminEmailData = {
    type: "withdrawal-admin",
    customer_email: order.email,
    display_id: order.display_id,
    confirmed_at: now,
  }

  try {
    const notificationService =
      req.scope.resolve<INotificationModuleService>(Modules.NOTIFICATION)
    await notificationService.createNotifications({
      to: "info@wjhoutbouw.nl",
      channel: "email",
      template: adminEmailData.type,
      data: adminEmailData as unknown as Record<string, unknown>,
    })
  } catch (err) {
    const logger = req.scope.resolve("logger")
    logger.warn(
      `[withdrawal.confirm] Admin notification failed for order ${id}: ${(err as Error).message}`
    )
  }

  res.json({ success: true })
}
