import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

type ProductRow = {
  id: string
  title: string
  thumbnail: string | null
  metadata: Record<string, unknown> | null
}

type PgConnection = {
  raw: (sql: string, bindings?: unknown[]) => Promise<{ rows: unknown[] }>
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve("query")

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "title", "thumbnail", "metadata"],
  })

  const sorted = [...(products as ProductRow[])].sort((a, b) => {
    const posA =
      a.metadata?.position != null ? Number(a.metadata.position) : Infinity
    const posB =
      b.metadata?.position != null ? Number(b.metadata.position) : Infinity
    return posA - posB
  })

  res.json({
    products: sorted.map((p) => ({
      id: p.id,
      title: p.title,
      thumbnail: p.thumbnail ?? null,
      position: p.metadata?.position ?? null,
    })),
  })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { positions } = req.body as {
    positions: { id: string; position: number }[]
  }

  const pgConnection = req.scope.resolve("__pg_connection__") as PgConnection

  await Promise.all(
    positions.map(({ id, position }) =>
      pgConnection.raw(
        `UPDATE product SET metadata = COALESCE(metadata, '{}') || ?::jsonb WHERE id = ?`,
        [JSON.stringify({ position }), id]
      )
    )
  )

  res.json({ ok: true })
}
