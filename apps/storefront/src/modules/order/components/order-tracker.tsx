"use client";

import { HttpTypes } from "@medusajs/types";
import { useEffect } from "react";

type OrderTrackerProps = {
  order: HttpTypes.StoreOrder;
};

export default function OrderTracker({ order }: OrderTrackerProps) {
  useEffect(() => {
    window.fbq?.("track", "Purchase", {
      value: order.total,
      currency: (order.currency_code ?? "eur").toUpperCase(),
      content_ids: order.items?.map((i) => i.product_id).filter(Boolean),
      content_type: "product",
      num_items: order.items?.length,
      order_id: order.id,
    });
  }, []);

  return null;
}
