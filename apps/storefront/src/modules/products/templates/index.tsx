import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { HttpTypes } from "@medusajs/types";
import ImageGallery from "@modules/products/components/image-gallery";
import ProductActions from "@modules/products/components/product-actions";
import ProductInfo from "@modules/products/templates/product-info";
import ProductActionsWrapper from "./product-actions-wrapper";
import Breadcrumb from "@modules/common/components/breadcrumb";

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct;
  images: HttpTypes.StoreProductImage[];
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  images,
}) => {
  if (!product?.id) return notFound();

  return (
    <div className="bg-wj-bg">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-5">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Winkel", href: "/winkel" },
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
        <div className="lg:sticky lg:top-24">
          <ImageGallery images={images} productTitle={product.title ?? ""} />
        </div>

        {/* Info + Actions */}
        <div>
          <ProductInfo product={product} />
          <Suspense
            fallback={
              <ProductActions disabled product={product} />
            }
          >
            <ProductActionsWrapper id={product.id} />
          </Suspense>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-wj-border bg-wj-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="py-10 sm:py-12 max-w-[720px]">
            <h2 className="font-display font-bold text-[22px] sm:text-[26px] text-wj-text tracking-[-0.02em] mb-4">Beschrijving</h2>
            <div className="font-body text-[15px] text-wj-muted leading-[1.8] whitespace-pre-wrap">
              {product.description ?? "Geen omschrijving beschikbaar."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTemplate;
