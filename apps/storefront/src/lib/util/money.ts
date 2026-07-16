import { isEmpty } from "./isEmpty";

type ConvertToLocaleParams = {
  amount: number;
  currency_code: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "nl-NL",
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString();
};

/**
 * Formats a price, and when a personal discount is active also returns the
 * original price so it can be shown crossed out. Mirrors the percentage
 * promotion the backend applies to the cart, so both should match.
 */
export const formatWithDiscount = (
  amount: number,
  currency_code: string,
  percentage?: number | null
): { price: string; originalPrice?: string } => {
  const format = (value: number) =>
    convertToLocale({ amount: value, currency_code });

  if (!percentage) {
    return { price: format(amount) };
  }

  const price = format(amount * (1 - percentage / 100));
  const originalPrice = format(amount);

  // Nothing to cross out when the discount makes no visible difference (€0
  // products, or amounts so small both round to the same string).
  return price === originalPrice ? { price } : { price, originalPrice };
};
