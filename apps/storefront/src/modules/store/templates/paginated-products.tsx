import { listProductSummaries, ProductSummary } from "@lib/data/products";
import { convertToLocale } from "@lib/util/money";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PlaceholderImage from "@modules/common/components/placeholder-image";
import BrandButton from "@modules/common/components/brand-button";
import BrandTag from "@modules/common/components/brand-tag";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const PRODUCT_LIMIT = 12;

// ── Editorial product row ──────────────────────────────────────────────────────
type ProductRowProps = {
  index: number;
  handle: string;
  title: string;
  description: string;
  material: string;
  tag?: string | null;
  features: string[];
  sizes: string[];
  priceFrom: string;
};

function ProductRow({
  index,
  handle,
  title,
  description,
  material,
  tag,
  features,
  sizes,
  priceFrom,
}: ProductRowProps) {
  const imageFirst = index % 2 === 0;

  return (
    <div className="border border-wj-border bg-wj-white overflow-hidden mb-1">
      <div className="flex flex-col lg:grid lg:grid-cols-2">
        {/* Image */}
        <div
          className={`relative min-h-[280px] lg:min-h-[500px] ${imageFirst ? "lg:order-first" : "lg:order-last"}`}
        >
          <PlaceholderImage label={`${title} — product photo`} />
          {tag && (
            <div className="absolute top-5 left-5">
              <BrandTag>{tag}</BrandTag>
            </div>
          )}
        </div>

        {/* Info */}
        <div
          className={`flex flex-col justify-center p-8 sm:p-12 lg:p-[52px] ${imageFirst ? "lg:order-last" : "lg:order-first"}`}
        >
          <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2.5">
            {material}
          </div>
          <h2 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-text tracking-[-0.02em] leading-[1.1] mb-3">
            {title}
          </h2>
          <p className="font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.7] mb-7">
            {description}
          </p>

          {/* Features */}
          <div className="mb-7 space-y-2">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 bg-wj-green shrink-0" />
                <span className="font-body text-[14px] text-wj-text">{f}</span>
              </div>
            ))}
          </div>

          {/* Sizes */}
          <div className="mb-8">
            <div className="font-body font-semibold text-[10px] tracking-[0.08em] uppercase text-wj-muted mb-2.5">
              Beschikbare maten
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((s) => (
                <span
                  key={s}
                  className="font-body font-medium text-[12px] px-3 py-[5px] border border-wj-border text-wj-text"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <div className="font-body font-semibold text-[10px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                Vanaf
              </div>
              <div className="font-display font-bold text-[32px] sm:text-[34px] text-wj-green tracking-[-0.02em]">
                {priceFrom}
              </div>
            </div>
            <LocalizedClientLink href={`/producten/${handle}`}>
              <BrandButton size="lg" className="w-full sm:w-auto">
                Bekijken &amp; bestellen
              </BrandButton>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Paginated products ─────────────────────────────────────────────────────────
export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
}: {
  sortBy?: SortOptions;
  page: number;
  collectionId?: string;
  categoryId?: string;
}) {
  const offset = (page - 1) * PRODUCT_LIMIT;
  const order = (sortBy as "created_at" | "price_asc" | "price_desc") ?? "created_at";

  const { products } = await listProductSummaries({
    limit: PRODUCT_LIMIT,
    offset,
    order,
    collectionId,
    categoryId,
  });

  if (products.length === 0) return null;

  const rows = products.map((product: ProductSummary, i: number) => ({
    index: i,
    handle: product.handle,
    title: product.title,
    description: product.description,
    material: product.metadata?.material ?? "Hout",
    tag: product.metadata?.tag ?? null,
    features: product.metadata?.features ?? [],
    sizes: product.sizes.length > 0 ? product.sizes : ["Standaard"],
    priceFrom: product.min_price
      ? convertToLocale({
          amount: product.min_price.calculated_amount,
          currency_code: product.min_price.currency_code,
        })
      : "—",
  }));

  return (
    <div data-testid="products-list">
      {rows.map((row) => (
        <ProductRow key={row.handle} {...row} />
      ))}
    </div>
  );
}
