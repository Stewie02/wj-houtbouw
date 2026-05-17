import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder;
};

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8">
      <h2 className="font-display font-semibold text-[20px] text-wj-text tracking-[-0.01em] mb-6">
        Delivery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div data-testid="shipping-address-summary">
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
            Shipping address
          </p>
          <p className="font-body text-[14px] text-wj-text">
            {order.shipping_address?.first_name}{" "}
            {order.shipping_address?.last_name}
          </p>
          <p className="font-body text-[14px] text-wj-text">
            {order.shipping_address?.address_1}{" "}
            {order.shipping_address?.address_2}
          </p>
          <p className="font-body text-[14px] text-wj-text">
            {order.shipping_address?.postal_code},{" "}
            {order.shipping_address?.city}
          </p>
          <p className="font-body text-[14px] text-wj-text">
            {order.shipping_address?.country_code?.toUpperCase()}
          </p>
        </div>

        <div data-testid="shipping-contact-summary">
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
            Contact
          </p>
          <p className="font-body text-[14px] text-wj-text">
            {order.shipping_address?.phone}
          </p>
          <p className="font-body text-[14px] text-wj-text">{order.email}</p>
        </div>

        <div data-testid="shipping-method-summary">
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
            Method
          </p>
          <p className="font-body text-[14px] text-wj-text">
            {(order.shipping_methods?.[0] as { name?: string })?.name}
          </p>
          <p className="font-body text-[14px] text-wj-muted">
            {convertToLocale({
              amount: order.shipping_methods?.[0]?.total ?? 0,
              currency_code: order.currency_code,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingDetails;
