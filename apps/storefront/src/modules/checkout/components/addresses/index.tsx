"use client";
import { setAddresses } from "@lib/data/cart";
import useToggleState from "@lib/hooks/use-toggle-state";
import compareAddresses from "@lib/util/compare-addresses";
import { CheckCircleSolid } from "@medusajs/icons";
import { HttpTypes } from "@medusajs/types";
import Spinner from "@modules/common/icons/spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useActionState } from "react";
import BillingAddress from "../billing_address";
import ErrorMessage from "../error-message";
import ShippingAddress from "../shipping-address";
import { SubmitButton } from "../submit-button";

const Addresses = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null;
  customer: HttpTypes.StoreCustomer | null;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("step") === "address";

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : true
  );

  const handleEdit = () => {
    router.push(pathname + "?step=address");
  };

  const [message, formAction] = useActionState(setAddresses, null);

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`font-display font-bold text-[20px] text-wj-text tracking-[-0.01em] flex items-center gap-2 ${!isOpen && !cart?.shipping_address ? "opacity-40" : ""}`}
        >
          Shipping address
          {!isOpen && cart?.shipping_address && (
            <CheckCircleSolid className="text-wj-green w-5 h-5" />
          )}
        </h2>
        {!isOpen && cart?.shipping_address && (
          <button
            onClick={handleEdit}
            className="font-body text-[13px] font-medium text-wj-green hover:underline"
            data-testid="edit-address-button"
          >
            Edit
          </button>
        )}
      </div>

      {isOpen ? (
        <form action={formAction}>
          <div className="flex flex-col gap-6">
            <ShippingAddress
              customer={customer}
              checked={sameAsBilling}
              onChange={toggleSameAsBilling}
              cart={cart}
            />

            {!sameAsBilling && (
              <div className="border-t border-wj-border pt-6">
                <h3 className="font-display font-bold text-[18px] text-wj-text mb-4">
                  Billing address
                </h3>
                <BillingAddress cart={cart} />
              </div>
            )}

            <SubmitButton data-testid="submit-address-button">
              Continue to delivery
            </SubmitButton>
            <ErrorMessage error={message} data-testid="address-error-message" />
          </div>
        </form>
      ) : (
        <div>
          {cart?.shipping_address ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div data-testid="shipping-address-summary">
                <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
                  Shipping address
                </p>
                <p className="font-body text-[14px] text-wj-text">
                  {cart.shipping_address.first_name}{" "}
                  {cart.shipping_address.last_name}
                </p>
                <p className="font-body text-[14px] text-wj-muted">
                  {cart.shipping_address.address_1}{" "}
                  {cart.shipping_address.address_2}
                </p>
                <p className="font-body text-[14px] text-wj-muted">
                  {cart.shipping_address.postal_code},{" "}
                  {cart.shipping_address.city}
                </p>
                <p className="font-body text-[14px] text-wj-muted">
                  {cart.shipping_address.country_code?.toUpperCase()}
                </p>
              </div>

              <div data-testid="shipping-contact-summary">
                <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
                  Contact
                </p>
                <p className="font-body text-[14px] text-wj-text">
                  {cart.shipping_address.phone}
                </p>
                <p className="font-body text-[14px] text-wj-muted">
                  {cart.email}
                </p>
              </div>

              <div data-testid="billing-address-summary">
                <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted mb-2">
                  Billing address
                </p>
                {sameAsBilling ? (
                  <p className="font-body text-[14px] text-wj-muted">
                    Same as shipping
                  </p>
                ) : (
                  <>
                    <p className="font-body text-[14px] text-wj-text">
                      {cart.billing_address?.first_name}{" "}
                      {cart.billing_address?.last_name}
                    </p>
                    <p className="font-body text-[14px] text-wj-muted">
                      {cart.billing_address?.address_1}{" "}
                      {cart.billing_address?.address_2}
                    </p>
                    <p className="font-body text-[14px] text-wj-muted">
                      {cart.billing_address?.postal_code},{" "}
                      {cart.billing_address?.city}
                    </p>
                    <p className="font-body text-[14px] text-wj-muted">
                      {cart.billing_address?.country_code?.toUpperCase()}
                    </p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      )}
    </div>
  );
};

export default Addresses;
