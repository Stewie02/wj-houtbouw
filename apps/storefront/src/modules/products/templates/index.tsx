import React, { Suspense } from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductInfo from "@modules/products/templates/product-info"
import ProductTabs from "@modules/products/components/product-tabs"
import ProductActionsWrapper from "./product-actions-wrapper"
import Breadcrumb from "@modules/common/components/breadcrumb"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product?.id) return notFound()

  return (
    <div className="bg-wj-bg">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-5">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/store" },
            { label: product.title },
          ]}
        />
      </div>

      {/* Main 2-col layout */}
      <div
        className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[72px] items-start"
        data-testid="product-container"
      >
        {/* Gallery */}
        <ImageGallery images={images} />

        {/* Info + Actions */}
        <div className="lg:sticky lg:top-24">
          <ProductInfo product={product} />
          <Suspense
            fallback={
              <ProductActions disabled product={product} region={region} />
            }
          >
            <ProductActionsWrapper id={product.id} region={region} />
          </Suspense>
        </div>
      </div>

      {/* Tabs */}
      <ProductTabs product={product} />

    </div>
  )
}

export default ProductTemplate
