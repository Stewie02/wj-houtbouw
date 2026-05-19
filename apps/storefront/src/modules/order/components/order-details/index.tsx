import { HttpTypes } from "@medusajs/types";

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder;
  showStatus?: boolean;
};

const FULFILLMENT_STATUS: Record<string, string> = {
  not_fulfilled: "Niet verzonden",
  partially_fulfilled: "Gedeeltelijk verzonden",
  fulfilled: "Verzonden",
  partially_shipped: "Gedeeltelijk onderweg",
  shipped: "Onderweg",
  partially_returned: "Gedeeltelijk retour",
  returned: "Retour ontvangen",
  canceled: "Geannuleerd",
  requires_action: "Actie vereist",
};

const PAYMENT_STATUS: Record<string, string> = {
  not_paid: "Niet betaald",
  awaiting: "In afwachting",
  captured: "Betaald",
  partially_captured: "Gedeeltelijk betaald",
  partially_refunded: "Gedeeltelijk terugbetaald",
  refunded: "Terugbetaald",
  canceled: "Geannuleerd",
  requires_action: "Actie vereist",
};

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 flex flex-col gap-2">
      <p className="font-body text-[14px] text-wj-muted">
        Bevestiging verzonden naar{" "}
        <span className="font-medium text-wj-text" data-testid="order-email">
          {order.email}
        </span>
      </p>
      <p className="font-body text-[14px] text-wj-muted">
        Besteldatum:{" "}
        <span className="text-wj-text" data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </p>
      {showStatus && (
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
          <p className="font-body text-[14px] text-wj-muted">
            Bezorgstatus:{" "}
            <span
              className="font-medium text-wj-text"
              data-testid="order-status"
            >
              {FULFILLMENT_STATUS[order.fulfillment_status] ?? order.fulfillment_status}
            </span>
          </p>
          <p className="font-body text-[14px] text-wj-muted">
            Betaalstatus:{" "}
            <span
              className="font-medium text-wj-text"
              data-testid="order-payment-status"
            >
              {PAYMENT_STATUS[order.payment_status] ?? order.payment_status}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
