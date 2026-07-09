import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"

type DisplayType = "select" | "button" | "color-swatch"

type DisplayBody = {
  option_id: string
  display: DisplayType
  swatches?: Record<string, string>
}

const DISPLAY_TYPES: DisplayType[] = ["select", "button", "color-swatch"]

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const { option_id, display, swatches = {} } = req.body as DisplayBody

  if (!option_id || !DISPLAY_TYPES.includes(display)) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "option_id and a valid display are required"
    )
  }

  const pgConnection = req.scope.resolve("__pg_connection__") as {
    raw: (sql: string, bindings?: unknown[]) => Promise<{ rowCount: number }>
  }

  const { rowCount } = await pgConnection.raw(
    `UPDATE product_option
     SET metadata = COALESCE(metadata, '{}') || ?::jsonb
     WHERE id = ? AND product_id = ? AND deleted_at IS NULL`,
    [JSON.stringify({ display, swatches }), option_id, id]
  )

  if (!rowCount) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Option not found")
  }

  res.json({ success: true })
}
