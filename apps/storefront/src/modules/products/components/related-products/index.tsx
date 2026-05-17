import { listProducts } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";
import PlaceholderImage from "@modules/common/components/placeholder-image";

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct;
};

export default async function RelatedProducts({
  product,
}: RelatedProductsProps) {
  const region = await getRegion();
  if (!region) return null;

  const queryParams: HttpTypes.StoreProductListParams = {
    region_id: region.id,
    is_giftcard: false,
  };
  if (product.collection_id)
    queryParams.collection_id = [product.collection_id];
  if (product.tags)
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[];

  const related = await listProducts({ queryParams })
    .then(({ response }) =>
      response.products.filter((p) => p.id !== product.id).slice(0, 2)
    )
    .catch(() => []);

  if (!related.length) return null;

  return (
    <div className="py-16 sm:py-20 bg-wj-surface">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <h2 className="font-display font-bold text-[28px] sm:text-[34px] text-wj-text tracking-[-0.02em]">
            Complete your setup
          </h2>
          <LocalizedClientLink href="/winkel">
            <BrandButton variant="outline" className="shrink-0">
              View all products
            </BrandButton>
          </LocalizedClientLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {related.map((p) => {
            const { cheapestPrice } = getProductPrice({ product: p });
            const material =
              (p.metadata?.material as string) ?? p.material ?? null;
            return (
              <LocalizedClientLink key={p.id} href={`/producten/${p.handle}`}>
                <div className="bg-wj-white border border-wj-border grid grid-cols-[200px_1fr] overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-full min-h-[160px]">
                    <PlaceholderImage label={p.title} />
                  </div>
                  <div className="p-7 flex flex-col justify-between">
                    <div>
                      {material && (
                        <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1.5">
                          {material}
                        </div>
                      )}
                      <div className="font-display font-semibold text-[20px] sm:text-[22px] text-wj-text mb-2">
                        {p.title}
                      </div>
                      {cheapestPrice && (
                        <div className="font-display font-bold text-[24px] sm:text-[26px] text-wj-green tracking-[-0.02em]">
                          {cheapestPrice.calculated_price}
                        </div>
                      )}
                    </div>
                    <div className="font-body font-medium text-[13px] text-wj-green mt-4">
                      Configure &amp; order →
                    </div>
                  </div>
                </div>
              </LocalizedClientLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
