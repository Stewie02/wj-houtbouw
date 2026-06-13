import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"

type PriceRow = {
  min_price: string | null
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const query = req.scope.resolve("query")
  // Knex instance — raw(sql, bindings) returns { rows: T[] }
  const pgConnection = req.scope.resolve("__pg_connection__") as {
    raw: (sql: string, bindings?: unknown[]) => Promise<{ rows: PriceRow[] }>
  }

  const reqQuery = req.query as Record<string, string>
  const { region_id, ...optionSelections } = reqQuery

  if (!region_id) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "region_id is required")
  }

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "currency_code"],
    filters: { id: region_id },
  })
  const currency_code = (
    regions[0] as { id: string; currency_code: string } | undefined
  )?.currency_code
  if (!currency_code) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Region not found")
  }

  // Build SQL dynamically: one EXISTS per selected option-value pair.
  // Replaces: N parallel query.graph calls + JS intersection + price_set fetch + calculatePrices.
  const optionEntries = Object.entries(optionSelections)
  const bindings: unknown[] = [id, currency_code]

  const existsClauses = optionEntries
    .map(([option_id, value]) => {
      bindings.push(option_id, value)
      return `AND EXISTS (
        SELECT 1 FROM product_variant_option pvo
        JOIN product_option_value pov ON pov.id = pvo.option_value_id
        WHERE pvo.variant_id = pv.id
          AND pov.option_id = ?
          AND pov.value = ?
          AND pov.deleted_at IS NULL
      )`
    })
    .join("\n  ")

  const sql = `
    SELECT MIN(p.amount) AS min_price
    FROM product_variant pv
    INNER JOIN product_variant_price_set pvps ON pvps.variant_id = pv.id
    INNER JOIN price p ON p.price_set_id = pvps.price_set_id
    WHERE pv.product_id = ?
      AND p.currency_code = ?
      AND (p.min_quantity IS NULL OR p.min_quantity <= 1)
      AND pv.deleted_at IS NULL
      AND pvps.deleted_at IS NULL
      AND p.deleted_at IS NULL
      AND p.price_list_id IS NULL
      ${existsClauses}
  `

  const { rows } = await pgConnection.raw(sql, bindings)
  const rawMin = rows[0]?.min_price

  if (rawMin == null) {
    return res.json({ min_price: null })
  }

  res.json({
    min_price: {
      calculated_amount: parseFloat(rawMin),
      currency_code,
    },
  })
}
