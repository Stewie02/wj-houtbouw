import { HttpTypes } from "@medusajs/types";

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Items from "@modules/order/components/items";
import OrderSummary from "@modules/order/components/order-summary";
import ShippingDetails from "@modules/order/components/shipping-details";
import PaymentDetails from "@modules/order/components/payment-details";
import Help from "@modules/order/components/help";

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder;
};

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  return (
    <div className="bg-wj-bg min-h-screen">
      <div className="bg-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <p className="font-body text-[12px] tracking-[0.1em] uppercase text-wj-muted mb-3">
            <LocalizedClientLink
              href="/"
              className="hover:text-wj-white transition-colors"
            >
              Home
            </LocalizedClientLink>
            {" / "}
            <span className="text-wj-white">Bestelling bevestigd</span>
          </p>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Bedankt voor je bestelling
          </h1>
          <p className="font-body text-wj-muted mt-2 text-[15px]">
            Bestelling #{order.display_id} &middot; Bevestiging verzonden naar{" "}
            <span data-testid="order-email">{order.email}</span>
          </p>
        </div>
      </div>

      <div
        className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14"
        data-testid="order-complete-container"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-14 items-start">
          <div className="flex flex-col gap-6">
            <Items order={order} />
            <ShippingDetails order={order} />
            <PaymentDetails order={order} />
            <Help />
          </div>
          <div className="lg:sticky lg:top-24">
            <OrderSummary order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
