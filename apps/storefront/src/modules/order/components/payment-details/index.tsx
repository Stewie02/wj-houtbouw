import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  if (!payment) return null

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8">
      <h2 className="font-display font-semibold text-[20px] text-wj-text tracking-[-0.01em] mb-6">
        Payment
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
            Payment method
          </p>
          <p
            className="font-body text-[14px] text-wj-text"
            data-testid="payment-method"
          >
            {paymentInfoMap[payment.provider_id].title}
          </p>
        </div>
        <div>
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
            Payment details
          </p>
          <p
            className="font-body text-[14px] text-wj-text"
            data-testid="payment-amount"
          >
            {isStripeLike(payment.provider_id) && payment.data?.card_last4
              ? `**** **** **** ${payment.data.card_last4}`
              : `${convertToLocale({
                  amount: payment.amount,
                  currency_code: order.currency_code,
                })} paid at ${new Date(
                  payment.created_at ?? ""
                ).toLocaleString()}`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentDetails
