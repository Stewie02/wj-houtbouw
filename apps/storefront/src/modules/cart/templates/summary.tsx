"use client";

import CartTotals from "@modules/common/components/cart-totals";
import DiscountCode from "@modules/checkout/components/discount-code";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";
import { HttpTypes } from "@medusajs/types";

type SummaryProps = {
  cart: HttpTypes.StoreCart;
};

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address";
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery";
  } else {
    return "payment";
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart);

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 flex flex-col gap-6">
      <h2 className="font-display font-bold text-[22px] text-wj-text tracking-[-0.01em]">
        Order summary
      </h2>

      {/* Discount code */}
      <DiscountCode cart={cart} />

      {/* Totals */}
      <div className="border-t border-wj-border pt-4">
        <CartTotals totals={cart} />
      </div>

      {/* Checkout CTA */}
      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <BrandButton size="lg" full>
          Proceed to checkout
        </BrandButton>
      </LocalizedClientLink>

      {/* Payment badges */}
      <div className="flex items-center justify-center gap-3 pt-1">
        {["iDEAL", "Visa", "Mastercard", "PayPal"].map((method) => (
          <span
            key={method}
            className="font-body text-[10px] font-semibold tracking-[0.06em] uppercase text-wj-muted border border-wj-border px-2 py-1"
          >
            {method}
          </span>
        ))}
      </div>

      <p className="font-body text-[12px] text-wj-muted text-center -mt-2">
        Secure checkout · 30-day returns
      </p>
    </div>
  );
};

export default Summary;
