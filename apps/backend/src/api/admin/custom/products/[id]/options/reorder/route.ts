import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"

type ReorderBody = {
  option_ids: string[]
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const { option_ids } = req.body as ReorderBody

  if (!Array.isArray(option_ids) || option_ids.length === 0) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "option_ids must be a non-empty array")
  }

  const pgConnection = req.scope.resolve("__pg_connection__") as {
    raw: (sql: string, bindings?: unknown[]) => Promise<unknown>
    transaction: (cb: (trx: { raw: (sql: string, bindings?: unknown[]) => Promise<unknown> }) => Promise<void>) => Promise<void>
  }

  await pgConnection.transaction(async (trx) => {
    for (let i = 0; i < option_ids.length; i++) {
      await trx.raw(
        `UPDATE product_option
         SET metadata = COALESCE(metadata, '{}') || ?::jsonb
         WHERE id = ? AND product_id = ? AND deleted_at IS NULL`,
        [JSON.stringify({ position: i }), option_ids[i], id]
      )
    }
  })

  res.json({ success: true })
}
