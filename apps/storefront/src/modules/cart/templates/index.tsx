import ItemsTemplate from "./items";
import Summary from "./summary";
import EmptyCartMessage from "../components/empty-cart-message";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { HttpTypes } from "@medusajs/types";

const CartTemplate = ({
  cart,
  customer: _customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  return (
    <div className="bg-wj-bg min-h-screen">
      {/* Page header */}
      <div className="bg-wj-dark border-b border-wj-dark">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
          <p className="font-body text-[12px] tracking-[0.1em] uppercase text-wj-muted mb-3">
            <LocalizedClientLink
              href="/"
              className="hover:text-wj-white transition-colors"
            >
              Home
            </LocalizedClientLink>
            {" / "}
            <span className="text-wj-white">Winkelwagen</span>
          </p>
          <h1 className="font-display font-bold text-[32px] sm:text-[40px] text-wj-white tracking-[-0.02em]">
            Winkelwagen
          </h1>
        </div>
      </div>

      <div
        className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14"
        data-testid="cart-container"
      >
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start">
            {/* Items */}
            <ItemsTemplate cart={cart} />

            {/* Summary */}
            <div className="lg:sticky lg:top-24">
              {cart?.region && <Summary cart={cart} />}
            </div>
          </div>
        ) : (
          <EmptyCartMessage />
        )}
      </div>
    </div>
  );
};

export default CartTemplate;
