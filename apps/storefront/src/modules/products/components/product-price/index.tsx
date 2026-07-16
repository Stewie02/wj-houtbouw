import { formatWithDiscount } from "@lib/util/money";

export default function ProductPrice({
  amount,
  currency_code,
  isFrom,
  discountPercentage,
}: {
  amount: number | null;
  currency_code: string;
  isFrom?: boolean;
  discountPercentage?: number | null;
}) {
  if (amount == null) {
    return (
      <div
        className="font-display font-bold text-[38px] text-wj-muted tracking-[-0.02em]"
        data-testid="product-price"
      >
        Selecteer opties
      </div>
    );
  }

  const { price, originalPrice } = formatWithDiscount(
    amount,
    currency_code,
    discountPercentage
  );

  return (
    <div className="flex flex-wrap items-baseline gap-x-3">
      <div
        className={`font-display font-bold text-[38px] tracking-[-0.02em] ${isFrom ? "text-wj-muted" : "text-wj-green"}`}
        data-testid="product-price"
        data-value={amount}
      >
        {isFrom ? `Vanaf ${price}` : price}
      </div>
      {originalPrice && (
        <div
          className="font-body font-medium text-[20px] text-wj-muted line-through"
          data-testid="product-original-price"
        >
          {originalPrice}
        </div>
      )}
    </div>
  );
}
