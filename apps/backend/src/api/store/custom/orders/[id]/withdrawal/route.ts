import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError, Modules } from "@medusajs/framework/utils"
import { randomUUID } from "crypto"
import sendWithdrawalRequestWorkflow from "../../../../../../workflows/send-withdrawal-request"

type WithdrawalBody = { reason?: string }

export async function POST(
  req: MedusaRequest<WithdrawalBody>,
  res: MedusaResponse
) {
  const { id } = req.params
  const { reason } = req.body as WithdrawalBody

  const query = req.scope.resolve("query")

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "display_id", "email", "status", "metadata"],
    filters: { id },
  })

  const order = orders[0] as unknown as {
    id: string
    display_id: string | null
    email: string
    status: string
    metadata: Record<string, unknown> | null
  } | undefined

  if (!order) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Bestelling niet gevonden")
  }

  if (order.metadata?.withdrawal_status) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Herroeping al ingediend voor deze bestelling"
    )
  }

  const token = randomUUID()
  const now = new Date().toISOString()

  const orderModuleService = req.scope.resolve(Modules.ORDER)
  await orderModuleService.updateOrders([
    {
      id,
      metadata: {
        ...(order.metadata ?? {}),
        withdrawal_at: now,
        withdrawal_token: token,
        withdrawal_status: "requested",
        withdrawal_reason: reason ?? null,
      },
    },
  ])

  try {
    await sendWithdrawalRequestWorkflow(req.scope).run({
      input: { order_id: id },
    })
  } catch (err) {
    const logger = req.scope.resolve("logger")
    logger.warn(
      `[withdrawal.request] Email notification failed for order ${id}: ${(err as Error).message}`
    )
  }

  res.json({ success: true })
}
