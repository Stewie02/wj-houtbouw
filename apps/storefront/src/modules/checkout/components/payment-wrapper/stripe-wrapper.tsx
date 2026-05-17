"use client";

import { Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { HttpTypes } from "@medusajs/types";
import { createContext, useMemo } from "react";

type StripeWrapperProps = {
  paymentSession: HttpTypes.StorePaymentSession;
  stripeKey?: string;
  stripePromise: Promise<Stripe | null> | null;
  children: React.ReactNode;
};

export const StripeContext = createContext(false);

const StripeWrapper: React.FC<StripeWrapperProps> = ({
  paymentSession,
  stripeKey,
  stripePromise,
  children,
}) => {
  const options: StripeElementsOptions = useMemo(
    () => ({
      clientSecret: paymentSession!.data?.client_secret as string | undefined,
      appearance: {
        theme: "flat",
        variables: {
          colorPrimary: "#2B4D1A",
          colorBackground: "#F7F3EE",
          colorText: "#1A1410",
          colorDanger: "#c0392b",
          fontFamily: "DM Sans, sans-serif",
          borderRadius: "0px",
        },
      },
    }),
    [paymentSession!.data?.client_secret]
  );

  if (!stripeKey) {
    throw new Error(
      "Stripe key is missing. Set NEXT_PUBLIC_STRIPE_KEY environment variable."
    );
  }

  if (!stripePromise) {
    throw new Error(
      "Stripe promise is missing. Make sure you have provided a valid Stripe key."
    );
  }

  if (!paymentSession?.data?.client_secret) {
    throw new Error(
      "Stripe client secret is missing. Cannot initialize Stripe."
    );
  }

  return (
    <StripeContext.Provider value={true}>
      <Elements options={options} stripe={stripePromise}>
        {children}
      </Elements>
    </StripeContext.Provider>
  );
};

export default StripeWrapper;
