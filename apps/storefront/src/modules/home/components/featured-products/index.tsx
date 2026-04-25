import { listProductsWithSort } from "@lib/data/products"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandButton from "@modules/common/components/brand-button"
import ProductCard from "@modules/common/components/product-card"

type FeaturedProductsProps = {
  countryCode: string
}

export default async function FeaturedProducts({ countryCode }: FeaturedProductsProps) {
  const { response } = await listProductsWithSort({
    page: 1,
    queryParams: { limit: 3, fields: "*variants.calculated_price" },
    sortBy: "created_at",
    countryCode,
  }).catch(() => ({ response: { products: [], count: 0 } }))

  const cards = response.products.map((product) => {
    const { cheapestPrice } = getProductPrice({ product })
    return {
      name: product.title,
      price: cheapestPrice?.calculated_price ?? "—",
      material: (product.metadata?.material as string) ?? undefined,
      tag: (product.metadata?.tag as string) ?? undefined,
      href: `/products/${product.handle}`,
    }
  })

  if (cards.length === 0) return null

  return (
    <div className="py-20 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2.5">
              Our collection
            </div>
            <h2 className="font-display font-bold text-[36px] sm:text-[42px] text-wj-text tracking-[-0.02em]">
              Bestselling tables
            </h2>
          </div>
          <LocalizedClientLink href="/store">
            <BrandButton variant="outline" className="shrink-0">
              View all products
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
  )
}
