import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";

type RawOptionValue = {
  value: string;
};

type RawOption = {
  values?: RawOptionValue[];
};

type RawProduct = {
  id: string;
  handle: string;
  title: string;
  subtitle: string | null;
  thumbnail: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  options?: RawOption[];
};

type PriceRow = {
  product_id: string;
  min_price: string;
};

type PositionRow = {
  id: string;
  position: string | null;
};

export type ProductSummary = {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  thumbnail: string | null;
  metadata: Record<string, unknown> | null;
  min_price: { calculated_amount: number; currency_code: string } | null;
};

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const {
    region_id,
    limit = "12",
    offset = "0",
    order = "position",
    collection_id,
    category_id,
  } = req.query as Record<string, string>;

  if (!region_id) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "region_id is required"
    );
  }

  const query = req.scope.resolve("query");
  const pgConnection = req.scope.resolve("__pg_connection__") as {
    raw: (
      sql: string,
      bindings?: unknown[]
    ) => Promise<{ rows: (PriceRow | PositionRow)[] }>;
  };

  // 1. Resolve currency_code from region
  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "currency_code"],
    filters: { id: region_id },
  });
  const currency_code = (
    regions[0] as { id: string; currency_code: string } | undefined
  )?.currency_code;
  if (!currency_code) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Region not found");
  }

  // 2. Fetch products
  const productFilters: Record<string, unknown> = {};
  if (collection_id) productFilters.collection_id = collection_id;

  const { data: rawProducts } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "handle",
      "title",
      "subtitle",
      "thumbnail",
      "metadata",
      "created_at",
      "options.values.value",
      ...(category_id ? ["categories.id"] : []),
    ],
    ...(Object.keys(productFilters).length > 0
      ? { filters: productFilters }
      : {}),
  });

  // category_id may be a comma-separated list; a product matches on any of them.
  const categoryIds = category_id ? category_id.split(",") : [];

  const products = (
    rawProducts as unknown as (RawProduct & { categories?: { id: string }[] })[]
  ).filter(
    (p) =>
      !categoryIds.length ||
      p.categories?.some((c) => categoryIds.includes(c.id))
  );

  if (products.length === 0) {
    return res.json({ products: [], count: 0 });
  }

  // 3. Fetch prices and positions in parallel — both single DB roundtrips.
  //    Positions read directly from JSONB to avoid relying on query.graph metadata.
  const productIds = products.map((p) => p.id);
  const placeholders = productIds.map(() => "?").join(",");

  const [{ rows: priceRows }, { rows: positionRows }] = await Promise.all([
    pgConnection.raw(
      `SELECT pv.product_id, MIN(p.amount) AS min_price
       FROM product_variant pv
       INNER JOIN product_variant_price_set pvps ON pvps.variant_id = pv.id
       INNER JOIN price p ON p.price_set_id = pvps.price_set_id
       WHERE pv.product_id IN (${placeholders})
         AND p.currency_code = ?
         AND (p.min_quantity IS NULL OR p.min_quantity <= 1)
         AND pv.deleted_at IS NULL
         AND pvps.deleted_at IS NULL
         AND p.deleted_at IS NULL
         AND p.price_list_id IS NULL
       GROUP BY pv.product_id`,
      [...productIds, currency_code]
    ),
    pgConnection.raw(
      `SELECT id, (metadata->>'position') AS position FROM product WHERE id IN (${placeholders})`,
      productIds
    ),
  ]);

  const minPriceByProductId = new Map<string, number>(
    (priceRows as PriceRow[]).map((r) => [r.product_id, parseFloat(r.min_price)])
  );

  const positionByProductId = new Map<string, number>(
    (positionRows as PositionRow[])
      .filter((r) => r.position != null)
      .map((r) => [r.id, parseInt(r.position!, 10)])
  );

  // 4. Sort
  const sorted = [...products];
  if (order === "created_at") {
    sorted.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else if (order === "position") {
    sorted.sort((a, b) => {
      const posA = positionByProductId.get(a.id) ?? Infinity;
      const posB = positionByProductId.get(b.id) ?? Infinity;
      return posA - posB;
    });
  }

  // 5. Build summaries
  const summaries: ProductSummary[] = sorted.map((product): ProductSummary => {
    const rawMinPrice = minPriceByProductId.get(product.id);
    const min_price =
      rawMinPrice != null
        ? { calculated_amount: rawMinPrice, currency_code }
        : null;

    return {
      id: product.id,
      handle: product.handle,
      title: product.title,
      subtitle: product.subtitle ?? "",
      thumbnail: product.thumbnail ?? null,
      metadata: product.metadata ?? null,
      min_price,
    };
  });

  // 6. Price sort
  if (order === "price_asc") {
    summaries.sort(
      (a, b) =>
        (a.min_price?.calculated_amount ?? Infinity) -
        (b.min_price?.calculated_amount ?? Infinity)
    );
  } else if (order === "price_desc") {
    summaries.sort(
      (a, b) =>
        (b.min_price?.calculated_amount ?? 0) -
        (a.min_price?.calculated_amount ?? 0)
    );
  }

  // 7. Paginate
  const limitNum = Math.max(1, parseInt(limit) || 12);
  const offsetNum = Math.max(0, parseInt(offset) || 0);
  const count = summaries.length;
  const page = summaries.slice(offsetNum, offsetNum + limitNum);

  res.json({ products: page, count });
}
