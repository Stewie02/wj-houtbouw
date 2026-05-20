import { HttpTypes } from "@medusajs/types";
import BrandTag from "@modules/common/components/brand-tag";
import StarRating from "@modules/common/components/star-rating";

type ProductInfoProps = {
  product: HttpTypes.StoreProduct;
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const material =
    (product.metadata?.material as string) ?? product.material ?? null;
  const tag = (product.metadata?.tag as string) ?? null;

  return (
    <div id="product-info" className="pt-2">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tag && <BrandTag>{tag}</BrandTag>}
        <BrandTag variant="wood">In stock</BrandTag>
      </div>

      {/* Title */}
      <h1
        className="font-display font-bold text-[36px] sm:text-[40px] text-wj-text tracking-[-0.02em] leading-tight"
        data-testid="product-title"
      >
        {product.title}
      </h1>

      {/* Material */}
      {material && (
        <div className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mt-2 mb-4">
          {material} · FSC Certified
        </div>
      )}

      {/* Description */}
      {product.description && (
        <p
          className="font-body text-[15px] text-wj-muted leading-[1.75]"
          data-testid="product-description"
        >
          {product.description}
        </p>
      )}
    </div>
  );
};

export default ProductInfo;
