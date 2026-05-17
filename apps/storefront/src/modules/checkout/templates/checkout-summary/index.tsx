import ItemsPreviewTemplate from "@modules/cart/templates/preview";
import DiscountCode from "@modules/checkout/components/discount-code";
import CartTotals from "@modules/common/components/cart-totals";
import { HttpTypes } from "@medusajs/types";

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 flex flex-col gap-6">
      <h2 className="font-display font-bold text-[20px] text-wj-text tracking-[-0.01em]">
        Order summary
      </h2>

      {/* Items preview */}
      <div className="flex flex-col divide-y divide-wj-border">
        <ItemsPreviewTemplate cart={cart} />
      </div>

      {/* Discount */}
      <div className="border-t border-wj-border pt-4">
        <DiscountCode cart={cart} />
      </div>

      {/* Totals */}
      <div className="border-t border-wj-border pt-4">
        <CartTotals totals={cart} />
      </div>
    </div>
  );
};

export default CheckoutSummary;
