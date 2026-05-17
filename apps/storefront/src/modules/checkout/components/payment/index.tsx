"use client";
import { isStripeLike, paymentInfoMap } from "@lib/constants";
import { initiatePaymentSession } from "@lib/data/cart";
import { CheckCircleSolid, CreditCard } from "@medusajs/icons";
import ErrorMessage from "@modules/checkout/components/error-message";
import BrandButton from "@modules/common/components/brand-button";
import { clx } from "@modules/common/components/ui";
import { HttpTypes } from "@medusajs/types";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import { StripeContext } from "../payment-wrapper/stripe-wrapper";

// Must be its own component so useStripe/useElements are only called inside <Elements>
const StripePaymentElementField = ({
  onComplete,
}: {
  onComplete: (complete: boolean) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) return null;

  return (
    <PaymentElement
      options={{ fields: { billingDetails: { name: "never" } } }}
      onChange={(e) => onComplete(e.complete)}
    />
  );
};

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: HttpTypes.StoreCart;
  availablePaymentMethods: { id: string }[];
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  );

  const stripeProvider = availablePaymentMethods.find((m) =>
    isStripeLike(m.id)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const stripeReady = useContext(StripeContext);

  const isOpen = searchParams.get("step") === "payment";

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])
      ?.length > 0 &&
    cart?.total === 0
  );

  const paymentReady =
    (activeSession && (cart?.shipping_methods?.length ?? 0) !== 0) ||
    paidByGiftcard;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // Auto-initiate the Stripe session when this step opens
  useEffect(() => {
    if (!isOpen || paidByGiftcard || !stripeProvider) return;
    if (activeSession?.provider_id === stripeProvider.id) return;

    initiatePaymentSession(cart, { provider_id: stripeProvider.id }).catch(
      (err) => {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to initialise payment. Please try again."
        );
      }
    );
  }, [isOpen]);

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!activeSession && stripeProvider) {
        await initiatePaymentSession(cart, { provider_id: stripeProvider.id });
      }
      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [isOpen]);

  const canContinue = paidByGiftcard || paymentComplete;

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8 mb-4">
      <div className="flex items-center justify-between mb-6">
        <h2
          className={clx(
            "font-display font-bold text-[20px] text-wj-text tracking-[-0.01em] flex items-center gap-2",
            {
              "opacity-40 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && (
            <CheckCircleSolid className="text-wj-green w-5 h-5" />
          )}
        </h2>
        {!isOpen && paymentReady && (
          <button
            onClick={handleEdit}
            className="font-body text-[13px] font-medium text-wj-green hover:underline"
            data-testid="edit-payment-button"
          >
            Edit
          </button>
        )}
      </div>

      <div className={isOpen ? "flex flex-col gap-4" : "hidden"}>
        {paidByGiftcard ? (
          <p className="font-body text-[14px] text-wj-text">Gift card</p>
        ) : !stripeProvider ? (
          <p className="font-body text-[14px] text-wj-muted">
            Online payment is not available at this time. Please contact us to
            complete your order.
          </p>
        ) : stripeReady ? (
          <StripePaymentElementField onComplete={setPaymentComplete} />
        ) : (
          <div className="h-48 bg-wj-surface animate-pulse" aria-hidden />
        )}

        <ErrorMessage
          error={error}
          data-testid="payment-method-error-message"
        />

        {(paidByGiftcard || stripeProvider) && (
          <BrandButton
            size="lg"
            full
            onClick={handleSubmit}
            disabled={!canContinue || isLoading}
            data-testid="submit-payment-button"
          >
            {isLoading ? "Processing…" : "Continue to review"}
          </BrandButton>
        )}
      </div>

      <div className={isOpen ? "hidden" : "block"}>
        {cart && paymentReady && activeSession ? (
          <div
            className="flex items-center gap-2"
            data-testid="payment-details-summary"
          >
            <span className="flex items-center p-1.5 border border-wj-border">
              {paymentInfoMap[activeSession.provider_id]?.icon || (
                <CreditCard />
              )}
            </span>
            <p className="font-body text-[14px] text-wj-text">
              {paymentInfoMap[activeSession.provider_id]?.title ||
                activeSession.provider_id}
            </p>
          </div>
        ) : paidByGiftcard ? (
          <p
            className="font-body text-[14px] text-wj-text"
            data-testid="payment-method-summary"
          >
            Gift card
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Payment;
