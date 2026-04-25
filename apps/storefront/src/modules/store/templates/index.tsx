import { Suspense } from "react"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"
import BrandButton from "@modules/common/components/brand-button"
import Breadcrumb from "@modules/common/components/breadcrumb"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"

const GUARANTEES = [
  { title: "10-year guarantee", body: "On all structural defects. No questions asked." },
  { title: "Free delivery", body: "On orders over €500 within the Netherlands." },
  { title: "Dutch-made", body: "Every product built in our Arnhem workshop." },
  { title: "FSC-certified", body: "All timber from sustainably managed forests." },
]

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="bg-wj-bg min-h-screen">
      {/* Dark page header */}
      <div className="bg-wj-dark pt-14 pb-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop" }]} dark />
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end">
            <h1 className="font-display font-bold text-[40px] sm:text-[52px] text-wj-white tracking-[-0.02em] leading-[1.08] mt-3">
              Three products.{" "}
              <span className="font-display font-normal italic text-wj-wood">Built properly.</span>
            </h1>
            <p className="font-body text-[14px] sm:text-[15px] text-[rgba(254,252,249,0.6)] leading-[1.75]">
              We don't make dozens of products. We make three — and we've been refining each of them
              since 2009. Every size, finish, and configuration ships from our own workshop in Arnhem.
            </p>
          </div>
        </div>
      </div>

      {/* Product list */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-4">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>

        {/* Custom / bespoke CTA */}
        <div className="mt-1 bg-wj-surface border border-wj-border p-10 sm:p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
          <div>
            <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2.5">
              Need something different?
            </div>
            <h3 className="font-display font-semibold text-[24px] sm:text-[28px] text-wj-text mb-2.5">
              Custom sizes and configurations
            </h3>
            <p className="font-body text-[14px] sm:text-[15px] text-wj-muted leading-[1.7] max-w-[560px]">
              All three products are available in custom lengths up to 300 cm, with optional backrest
              benches, custom finish colours, and engraving. Contact us for a tailored quote —
              turnaround is typically 3–4 weeks.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            <LocalizedClientLink href="/contact">
              <BrandButton size="lg" className="w-full">Request a custom quote</BrandButton>
            </LocalizedClientLink>
            <LocalizedClientLink href="/about">
              <BrandButton size="lg" variant="outline" className="w-full">Visit our workshop</BrandButton>
            </LocalizedClientLink>
          </div>
        </div>

        {/* Guarantee strip */}
        <div className="mt-1 grid grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g, i) => (
            <div key={g.title} className={`p-7 sm:p-8 ${i % 2 === 0 ? "bg-wj-green" : "bg-wj-green-light"}`}>
              <div className={`font-display font-semibold text-[15px] sm:text-[16px] mb-2 ${i % 2 === 0 ? "text-wj-white" : "text-wj-green"}`}>
                {g.title}
              </div>
              <p className={`font-body text-[13px] leading-[1.6] ${i % 2 === 0 ? "text-[rgba(255,255,255,0.65)]" : "text-wj-muted"}`}>
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-24" />
    </div>
  )
}

export default StoreTemplate
