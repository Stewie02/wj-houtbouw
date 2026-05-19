import { Metadata } from "next";

import OrderOverview from "@modules/account/components/order-overview";
import { notFound } from "next/navigation";
import { listOrders } from "@lib/data/orders";
import Divider from "@modules/common/components/divider";
import TransferRequestForm from "@modules/account/components/transfer-request-form";

export const metadata: Metadata = {
  title: "Bestellingen",
  description: "Overzicht van je eerdere bestellingen.",
};

export default async function Orders() {
  const orders = await listOrders();

  if (!orders) {
    notFound();
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8">
        <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-2">
          Mijn account
        </p>
        <h1 className="font-display font-bold text-[28px] text-wj-text tracking-[-0.02em] mb-2">
          Bestellingen
        </h1>
        <p className="font-body text-[14px] text-wj-muted">
          Bekijk je eerdere bestellingen en hun status.
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="mb-8 mt-8" />
        <TransferRequestForm />
      </div>
    </div>
  );
}
