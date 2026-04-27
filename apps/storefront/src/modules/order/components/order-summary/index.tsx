import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

type OrderSummaryProps = {
  order: HttpTypes.StoreOrder
}

const OrderSummary = ({ order }: OrderSummaryProps) => {
  const getAmount = (amount?: number | null) => {
    if (amount == null) return null
    return convertToLocale({ amount, currency_code: order.currency_code })
  }

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 flex flex-col gap-4">
      <h2 className="font-display font-semibold text-[20px] text-wj-text tracking-[-0.01em]">
        Order summary
      </h2>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between font-body text-[14px] text-wj-muted">
          <span>Subtotal</span>
          <span>{getAmount(order.subtotal)}</span>
        </div>
        {(order.discount_total ?? 0) > 0 && (
          <div className="flex justify-between font-body text-[14px] text-wj-green">
            <span>Discount</span>
            <span>- {getAmount(order.discount_total)}</span>
          </div>
        )}
        {(order.gift_card_total ?? 0) > 0 && (
          <div className="flex justify-between font-body text-[14px] text-wj-green">
            <span>Gift card</span>
            <span>- {getAmount(order.gift_card_total)}</span>
          </div>
        )}
        <div className="flex justify-between font-body text-[14px] text-wj-muted">
          <span>Shipping</span>
          <span>{getAmount(order.shipping_total)}</span>
        </div>
        <div className="flex justify-between font-body text-[14px] text-wj-muted">
          <span>Taxes</span>
          <span>{getAmount(order.tax_total)}</span>
        </div>
      </div>

      <div className="border-t border-wj-border pt-4 flex justify-between items-baseline">
        <span className="font-body font-semibold text-[15px] text-wj-text">
          Total
        </span>
        <span className="font-display font-bold text-[22px] text-wj-text">
          {getAmount(order.total)}
        </span>
      </div>

      <LocalizedClientLink
        href="/store"
        className="inline-flex items-center justify-center w-full font-body font-medium tracking-[0.04em] text-[14px] px-7 py-[13px] bg-wj-green text-wj-white border border-transparent transition-all duration-[180ms] hover:opacity-90 mt-2"
      >
        Continue shopping
      </LocalizedClientLink>
    </div>
  )
}

export default OrderSummary
