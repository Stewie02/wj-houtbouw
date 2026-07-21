import { listProductSummaries } from "@lib/data/products";
import { getActiveDiscount } from "@lib/data/promotions";
import { formatWithDiscount } from "@lib/util/money";
import ProductCard from "@modules/common/components/product-card";
import SectionContainer from "@modules/common/components/section-container";

type RelatedProductsProps = {
  currentProductId: string;
  categoryIds?: string[];
  collectionId?: string;
};

export default async function RelatedProducts({
  currentProductId,
  categoryIds,
  collectionId,
}: RelatedProductsProps) {
  if (!categoryIds?.length && !collectionId) return null;

  // Prefer categories; fall back to collection. Fetch one extra to keep 4 after
  // dropping the current product.
  const { products } = await listProductSummaries({
    limit: 5,
    ...(categoryIds?.length
      ? { categoryId: categoryIds.join(",") }
      : { collectionId }),
  });

  const discount = await getActiveDiscount();

  const cards = products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4)
    .map((product) => ({
      name: product.title,
      ...(product.min_price
        ? formatWithDiscount(
            product.min_price.calculated_amount,
            product.min_price.currency_code,
            discount?.percentage
          )
        : { price: "—" }),
      material: product.metadata?.material as string | undefined,
      tag: product.metadata?.tag as string | undefined,
      href: `/producten/${product.handle}`,
      thumbnail: product.thumbnail,
    }));

  if (cards.length === 0) return null;

  return (
    <div className="border-t border-wj-border">
      <SectionContainer className="py-10 sm:py-12">
        <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-1.5">
          Ontdek meer
        </div>
        <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-wj-text tracking-[-0.02em] mb-6 sm:mb-7">
          Vergelijkbare producten
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card) => (
            <ProductCard key={card.name} {...card} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
