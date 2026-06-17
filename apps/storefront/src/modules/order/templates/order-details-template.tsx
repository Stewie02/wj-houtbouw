"use client";

import { HttpTypes } from "@medusajs/types";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Help from "@modules/order/components/help";
import Items from "@modules/order/components/items";
import OrderDetails from "@modules/order/components/order-details";
import OrderSummary from "@modules/order/components/order-summary";
import ShippingDetails from "@modules/order/components/shipping-details";
import WithdrawalButton from "@modules/order/components/withdrawal-button";
import React from "react";

type OrderDetailsTemplateProps = {
  order: HttpTypes.StoreOrder;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 justify-between items-center">
        <h1 className="font-display font-bold text-[24px] sm:text-[28px] text-wj-text tracking-[-0.02em]">
          Bestelling #{order.display_id}
        </h1>
        <LocalizedClientLink
          href="/account/bestellingen"
          className="font-body text-[13px] text-wj-green hover:underline"
          data-testid="back-to-overview-button"
        >
          ← Terug naar bestellingen
        </LocalizedClientLink>
      </div>
      <div
        className="flex flex-col gap-4 w-full"
        data-testid="order-details-container"
      >
        <OrderDetails order={order} showStatus />
        <Items order={order} />
        <ShippingDetails order={order} />
        <OrderSummary order={order} />
        <WithdrawalButton order={order} />
        <Help />
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
