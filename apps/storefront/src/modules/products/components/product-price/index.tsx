import { getProductPrice } from "@lib/util/get-product-price";
import { HttpTypes } from "@medusajs/types";

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct;
  variant?: HttpTypes.StoreProductVariant;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="h-12 w-36 bg-wj-surface animate-pulse" />;
  }

  return (
    <div className="flex flex-col">
      <div
        className="font-display font-bold text-[38px] text-wj-green tracking-[-0.02em]"
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
      >
        {!variant && "From "}
        {selectedPrice.calculated_price}
      </div>
      {selectedPrice.price_type === "sale" && (
        <div className="flex items-center gap-2 mt-1">
          <span
            className="font-body text-[13px] text-wj-muted line-through"
            data-testid="original-product-price"
          >
            {selectedPrice.original_price}
          </span>
          <span className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood">
            -{selectedPrice.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  );
}
