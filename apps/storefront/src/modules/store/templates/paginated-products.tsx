import { listProductsWithSort } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PlaceholderImage from "@modules/common/components/placeholder-image";
import BrandButton from "@modules/common/components/brand-button";
import BrandTag from "@modules/common/components/brand-tag";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
  order?: string;
};

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
              Available sizes
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
                Starting from
              </div>
              <div className="font-display font-bold text-[32px] sm:text-[34px] text-wj-green tracking-[-0.02em]">
                {priceFrom}
              </div>
            </div>
            <LocalizedClientLink href={`/producten/${handle}`}>
              <BrandButton size="lg" className="w-full sm:w-auto">
                Configure &amp; order
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
  productsIds,
}: {
  sortBy?: SortOptions;
  page: number;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
}) {
  const region = await getRegion();
  if (!region) return null;

  const queryParams: PaginatedProductsParams = { limit: PRODUCT_LIMIT };
  if (collectionId) queryParams.collection_id = [collectionId];
  if (categoryId) queryParams.category_id = [categoryId];
  if (productsIds) queryParams.id = productsIds;
  if (sortBy === "created_at") queryParams.order = "created_at";

  const {
    response: { products },
  } = await listProductsWithSort({
    page,
    queryParams: { ...queryParams, fields: "*variants.calculated_price" },
    sortBy,
  });

  const rows = products.map((product: HttpTypes.StoreProduct, i: number) => {
    const { cheapestPrice } = getProductPrice({ product });
    const variantOptions = product.variants
      ?.flatMap((v) => v.options?.map((o) => o.value) ?? [])
      .filter(Boolean) as string[];
    const uniqueSizes = Array.from(new Set(variantOptions)).slice(0, 6);

    return {
      index: i,
      handle: product.handle ?? product.id!,
      title: product.title,
      description: product.description ?? "",
      material: (product.metadata?.material as string) ?? "Timber",
      tag: (product.metadata?.tag as string) ?? null,
      features: (product.metadata?.features as string[]) ?? [
        "FSC-certified timber",
        "10-year guarantee",
      ],
      sizes: uniqueSizes.length > 0 ? uniqueSizes : ["Standard"],
      priceFrom: cheapestPrice?.calculated_price ?? "—",
    };
  });

  return (
    <div data-testid="products-list">
      {rows.map((row) => (
        <ProductRow key={row.handle} {...row} />
      ))}
    </div>
  );
}
