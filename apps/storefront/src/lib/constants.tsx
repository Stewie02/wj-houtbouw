import {
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Sun,
  Wrench,
} from "@medusajs/icons";

export const USPS = [
  { title: "Duurzame materialen", description: "Weerbestendig en sterk gebouwd", icon: Sun },
  { title: "Op maat gemaakt", description: "Elke order naar jouw wensen", icon: Wrench },
  { title: "5 jaar garantie", description: "Gebouwd om te blijven", icon: ShieldCheck },
  {
    title: "Nederlands vakmanschap",
    description: "Gemaakt in eigen werkplaats",
    icon: BadgeCheck,
  },
];

export const DELIVERY_ESTIMATE = "Op maat gemaakt en bij u geleverd in circa 1 tot 3 weken";
import Bancontact from "@modules/common/icons/bancontact";
import Ideal from "@modules/common/icons/ideal";
import PayPal from "@modules/common/icons/paypal";
import React from "react";

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<
  string,
  { title: string; icon: React.JSX.Element }
> = {
  pp_stripe_stripe: {
    title: "Online payment",
    icon: <CreditCard />,
  },
  "pp_medusa-payments_default": {
    title: "Credit card",
    icon: <CreditCard />,
  },
  "pp_stripe-ideal_stripe": {
    title: "iDeal",
    icon: <Ideal />,
  },
  "pp_stripe-bancontact_stripe": {
    title: "Bancontact",
    icon: <Bancontact />,
  },
  pp_paypal_paypal: {
    title: "PayPal",
    icon: <PayPal />,
  },
  pp_system_default: {
    title: "Manual Payment",
    icon: <CreditCard />,
  },
  // Add more payment providers here
};

// This only checks if it is native stripe or medusa payments for card payments, it ignores the other stripe-based providers
export const isStripeLike = (providerId?: string) => {
  return (
    providerId?.startsWith("pp_stripe_") || providerId?.startsWith("pp_medusa-")
  );
};

export const isManual = (providerId?: string) => {
  return providerId?.startsWith("pp_system_default");
};
