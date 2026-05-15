import { HttpTypes } from "@medusajs/types"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")
    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 flex flex-col gap-2">
      <p className="font-body text-[14px] text-wj-muted">
        Confirmation sent to{" "}
        <span className="font-medium text-wj-text" data-testid="order-email">
          {order.email}
        </span>
      </p>
      <p className="font-body text-[14px] text-wj-muted">
        Order date:{" "}
        <span className="text-wj-text" data-testid="order-date">
          {new Date(order.created_at).toDateString()}
        </span>
      </p>
      {showStatus && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
          <p className="font-body text-[14px] text-wj-muted">
            Order status:{" "}
            <span className="font-medium text-wj-text" data-testid="order-status">
              {formatStatus(order.fulfillment_status)}
            </span>
          </p>
          <p className="font-body text-[14px] text-wj-muted">
            Payment status:{" "}
            <span className="font-medium text-wj-text" data-testid="order-payment-status">
              {formatStatus(order.payment_status)}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default OrderDetails
