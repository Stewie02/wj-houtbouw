import { convertToLocale } from "@lib/util/money";

export default function ProductPrice({
  amount,
  currency_code,
  isFrom,
}: {
  amount: number | null;
  currency_code: string;
  isFrom?: boolean;
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

  const formatted = convertToLocale({ amount, currency_code });

  return (
    <div
      className={`font-display font-bold text-[38px] tracking-[-0.02em] ${isFrom ? "text-wj-muted" : "text-wj-green"}`}
      data-testid="product-price"
      data-value={amount}
    >
      {isFrom ? `Vanaf ${formatted}` : formatted}
    </div>
  );
}
