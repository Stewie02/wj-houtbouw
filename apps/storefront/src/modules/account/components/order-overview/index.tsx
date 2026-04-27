"use client"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import BrandButton from "@modules/common/components/brand-button"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-6 w-full">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-wj-white border border-wj-border p-12 flex flex-col items-center text-center gap-4" data-testid="no-orders-container">
      <h2 className="font-display font-bold text-[22px] text-wj-text tracking-[-0.01em]">
        No orders yet
      </h2>
      <p className="font-body text-[14px] text-wj-muted max-w-xs">
        You haven&apos;t placed any orders. Browse our collection to find something you&apos;ll love.
      </p>
      <LocalizedClientLink href="/store">
        <BrandButton data-testid="continue-shopping-button">Start shopping</BrandButton>
      </LocalizedClientLink>
    </div>
  )
}

export default OrderOverview
