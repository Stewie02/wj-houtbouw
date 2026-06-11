import { getPricesForVariant, VariantWithPrice } from "@lib/util/get-product-price";
import { convertToLocale } from "@lib/util/money";
import { MinPrice } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";

export default function ProductPrice({
  variant,
  isLoading,
  minPrice,
}: {
  variant?: HttpTypes.StoreProductVariant | null;
  isLoading?: boolean;
  minPrice?: MinPrice | null;
}) {
  if (isLoading) {
    return <div className="h-12 w-36 bg-wj-surface animate-pulse" />;
  }

  if (!variant) {
    const fromPrice = minPrice
      ? convertToLocale({
          amount: minPrice.calculated_amount,
          currency_code: minPrice.currency_code,
        })
      : null;

    return (
      <div
        className="font-display font-bold text-[38px] text-wj-muted tracking-[-0.02em]"
        data-testid="product-price"
      >
        {fromPrice ? `Vanaf ${fromPrice}` : "Selecteer opties"}
      </div>
    );
  }

  const price = getPricesForVariant(variant as VariantWithPrice);

  if (!price) {
    return <div className="h-12 w-36 bg-wj-surface animate-pulse" />;
  }

  return (
    <div className="flex flex-col">
      <div
        className="font-display font-bold text-[38px] text-wj-green tracking-[-0.02em]"
        data-testid="product-price"
        data-value={price.calculated_price_number}
      >
        {price.calculated_price}
      </div>
      {price.price_type === "sale" && (
        <div className="flex items-center gap-2 mt-1">
          <span
            className="font-body text-[13px] text-wj-muted line-through"
            data-testid="original-product-price"
          >
            {price.original_price}
          </span>
          <span className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood">
            -{price.percentage_diff}%
          </span>
        </div>
      )}
    </div>
  );
}
