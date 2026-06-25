import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type OptionRow = {
  option_id: string
  option_title: string
  created_at: string
  value: string
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const pgConnection = req.scope.resolve("__pg_connection__") as {
    raw: (sql: string, bindings?: unknown[]) => Promise<{ rows: OptionRow[] }>
  }

  const { rows } = await pgConnection.raw(
    `
    SELECT
      po.id       AS option_id,
      po.title    AS option_title,
      po.created_at,
      pov.value
    FROM product_option po
    JOIN product_option_value pov ON pov.option_id = po.id
    WHERE po.product_id = ?
      AND po.deleted_at IS NULL
      AND pov.deleted_at IS NULL
    ORDER BY COALESCE((po.metadata->>'position')::int, 999) ASC, po.created_at ASC, po.id ASC, pov.value ASC
    `,
    [id]
  )

  const optionMap = new Map<string, { id: string; title: string; values: Set<string> }>()
  for (const row of rows) {
    if (!optionMap.has(row.option_id)) {
      optionMap.set(row.option_id, {
        id: row.option_id,
        title: row.option_title,
        values: new Set(),
      })
    }
    optionMap.get(row.option_id)!.values.add(row.value)
  }

  const options = [...optionMap.values()].map((o) => ({
    id: o.id,
    title: o.title,
    values: [...o.values].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    ),
  }))

  res.json({ options })
}
