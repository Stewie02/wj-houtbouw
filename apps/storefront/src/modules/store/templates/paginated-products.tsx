import Image from "next/image";
import { listProductSummaries, ProductSummary } from "@lib/data/products";
import { getActiveDiscount } from "@lib/data/promotions";
import { formatWithDiscount } from "@lib/util/money";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import PlaceholderImage from "@modules/common/components/placeholder-image";
import BrandButton from "@modules/common/components/brand-button";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const PRODUCT_LIMIT = 12;

// ── Editorial product row ──────────────────────────────────────────────────────
type ProductRowProps = {
  index: number;
  handle: string;
  title: string;
  subtitle: string;
  thumbnail: string | null;
  priceFrom: string;
  originalPriceFrom?: string;
};

function ProductRow({
  index,
  handle,
  title,
  subtitle,
  thumbnail,
  priceFrom,
  originalPriceFrom,
}: ProductRowProps) {
  const imageFirst = index % 2 === 0;

  return (
    <LocalizedClientLink
      href={`/producten/${handle}`}
      className="group block border border-wj-border bg-wj-white overflow-hidden mb-1"
    >
      <div className="flex flex-col lg:grid lg:grid-cols-2">
        {/* Image */}
        <div
          className={`relative aspect-[3/2] overflow-hidden ${imageFirst ? "lg:order-first" : "lg:order-last"}`}
        >
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <PlaceholderImage label={`${title} — product photo`} />
          )}
        </div>

        {/* Info */}
        <div
          className={`flex flex-col justify-center p-8 sm:p-12 lg:p-[52px] ${imageFirst ? "lg:order-last" : "lg:order-first"}`}
        >
          <h2 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-text tracking-[-0.02em] leading-[1.1] mb-3">
            {title}
          </h2>
          <p className="font-body text-[15px] sm:text-[16px] text-wj-muted leading-[1.7] mb-7">
            {subtitle}
          </p>

          {/* Price + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <div className="font-body font-semibold text-[10px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                Vanaf
              </div>
              <div className="flex items-baseline gap-2.5">
                <div className="font-display font-bold text-[32px] sm:text-[34px] text-wj-green tracking-[-0.02em]">
                  {priceFrom}
                </div>
                {originalPriceFrom && (
                  <div className="font-body font-medium text-[18px] text-wj-muted line-through">
                    {originalPriceFrom}
                  </div>
                )}
              </div>
            </div>
            <BrandButton
              as="span"
              size="lg"
              className="w-full sm:w-auto group-hover:bg-wj-green-hover"
            >
              Bekijken &amp; bestellen
            </BrandButton>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
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
  const order =
    (sortBy as "created_at" | "price_asc" | "price_desc" | "position") ??
    "position";

  const { products } = await listProductSummaries({
    limit: PRODUCT_LIMIT,
    offset,
    order,
    collectionId,
    categoryId,
  });

  if (products.length === 0) return null;

  const discount = await getActiveDiscount();

  const rows = products.map((product: ProductSummary, i: number) => {
    const { price, originalPrice } = product.min_price
      ? formatWithDiscount(
          product.min_price.calculated_amount,
          product.min_price.currency_code,
          discount?.percentage
        )
      : { price: "—", originalPrice: undefined };

    return {
      index: i,
      handle: product.handle,
      title: product.title,
      subtitle: product.subtitle,
      thumbnail: product.thumbnail ?? null,
      priceFrom: price,
      originalPriceFrom: originalPrice,
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
