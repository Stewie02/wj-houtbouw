import { useMemo } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import PlaceholderImage from "@modules/common/components/placeholder-image"
import BrandButton from "@modules/common/components/brand-button"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OrderCardProps = {
  order: HttpTypes.StoreOrder
}

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(
    () => order.items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
    [order]
  )

  return (
    <div className="bg-wj-white border border-wj-border p-6 flex flex-col gap-5" data-testid="order-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
            Order
          </p>
          <p className="font-display font-bold text-[20px] text-wj-text tracking-[-0.01em]">
            #<span data-testid="order-display-id">{order.display_id}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
            Total
          </p>
          <p className="font-display font-bold text-[18px] text-wj-green" data-testid="order-amount">
            {convertToLocale({ amount: order.total, currency_code: order.currency_code })}
          </p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 text-wj-muted font-body text-[13px] border-t border-wj-border pt-4">
        <span data-testid="order-created-at">
          {new Date(order.created_at).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
        </span>
        <span className="text-wj-border">·</span>
        <span>{numberOfLines} {numberOfLines === 1 ? "item" : "items"}</span>
      </div>

      {/* Thumbnails */}
      {(order.items?.length ?? 0) > 0 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {order.items?.slice(0, 4).map((item) => (
            <div key={item.id} className="aspect-square border border-wj-border overflow-hidden" data-testid="order-item">
              <PlaceholderImage label={item.title ?? ""} />
            </div>
          ))}
          {(order.items?.length ?? 0) > 4 && (
            <div className="aspect-square border border-wj-border flex items-center justify-center">
              <span className="font-body text-[12px] text-wj-muted">+{(order.items?.length ?? 0) - 4}</span>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="flex justify-end border-t border-wj-border pt-4">
        <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
          <BrandButton variant="outline" size="sm" data-testid="order-details-link">
            View order
          </BrandButton>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderCard
