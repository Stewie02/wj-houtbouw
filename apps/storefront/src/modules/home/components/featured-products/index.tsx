import { listProductSummaries } from "@lib/data/products";
import { convertToLocale } from "@lib/util/money";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";
import ProductCard from "@modules/common/components/product-card";

export default async function FeaturedProducts() {
  const { products } = await listProductSummaries({ limit: 3 });

  const cards = products.map((product) => ({
    name: product.title,
    price: product.min_price
      ? convertToLocale({
          amount: product.min_price.calculated_amount,
          currency_code: product.min_price.currency_code,
        })
      : "—",
    material: product.metadata?.material,
    tag: product.metadata?.tag ?? undefined,
    href: `/producten/${product.handle}`,
  }));

  if (cards.length === 0) return null;

  return (
    <div className="py-20 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2.5">
              Onze collectie
            </div>
            <h2 className="font-display font-bold text-[36px] sm:text-[42px] text-wj-text tracking-[-0.02em]">
              Onze collectie
            </h2>
          </div>
          <LocalizedClientLink href="/winkel">
            <BrandButton variant="outline" className="shrink-0">
              Producten bekijken
            </BrandButton>
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {cards.map((card) => (
            <ProductCard key={card.name} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
