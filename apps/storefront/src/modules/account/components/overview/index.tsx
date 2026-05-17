import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null;
  orders: HttpTypes.StoreOrder[] | null;
};

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="flex flex-col gap-8">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        <div className="bg-wj-white border border-wj-border p-6">
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
            Addresses
          </p>
          <p
            className="font-display font-bold text-[32px] text-wj-text tracking-[-0.02em]"
            data-testid="addresses-count"
            data-value={customer?.addresses?.length ?? 0}
          >
            {customer?.addresses?.length ?? 0}
          </p>
          <p className="font-body text-[12px] text-wj-muted mt-1">saved</p>
        </div>

        <div className="bg-wj-white border border-wj-border p-6">
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
            Orders
          </p>
          <p className="font-display font-bold text-[32px] text-wj-text tracking-[-0.02em]">
            {orders?.length ?? 0}
          </p>
          <p className="font-body text-[12px] text-wj-muted mt-1">placed</p>
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-[20px] text-wj-text tracking-[-0.01em]">
            Recent orders
          </h2>
          <LocalizedClientLink
            href="/account/bestellingen"
            className="font-body text-[13px] font-medium text-wj-green hover:underline"
          >
            View all
          </LocalizedClientLink>
        </div>

        {orders && orders.length > 0 ? (
          <div className="flex flex-col gap-3" data-testid="orders-wrapper">
            {orders.slice(0, 5).map((order) => (
              <LocalizedClientLink
                key={order.id}
                href={`/account/orders/details/${order.id}`}
                data-testid="order-wrapper"
                data-value={order.id}
              >
                <div className="bg-wj-white border border-wj-border p-4 sm:p-5 hover:border-wj-text transition-colors grid grid-cols-3 sm:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                      Date
                    </p>
                    <p
                      className="font-body text-[13px] text-wj-text"
                      data-testid="order-created-date"
                    >
                      {new Date(order.created_at).toLocaleDateString("nl-NL", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                      Order
                    </p>
                    <p
                      className="font-body text-[13px] text-wj-text"
                      data-testid="order-id"
                      data-value={order.display_id}
                    >
                      #{order.display_id}
                    </p>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-1">
                      Total
                    </p>
                    <p
                      className="font-body font-semibold text-[13px] text-wj-text"
                      data-testid="order-amount"
                    >
                      {convertToLocale({
                        amount: order.total,
                        currency_code: order.currency_code,
                      })}
                    </p>
                  </div>
                  <div className="hidden sm:flex justify-end">
                    <span className="font-body text-[13px] text-wj-green font-medium">
                      View →
                    </span>
                  </div>
                </div>
              </LocalizedClientLink>
            ))}
          </div>
        ) : (
          <div className="bg-wj-white border border-wj-border p-8 text-center">
            <p
              className="font-body text-[15px] text-wj-muted"
              data-testid="no-orders-message"
            >
              You haven&apos;t placed any orders yet.
            </p>
            <LocalizedClientLink
              href="/winkel"
              className="font-body text-[13px] font-medium text-wj-green hover:underline mt-3 inline-block"
            >
              Start shopping →
            </LocalizedClientLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
