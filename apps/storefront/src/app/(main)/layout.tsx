import { Metadata } from "next";

import { listCartOptions, retrieveCart } from "@lib/data/cart";
import { retrieveCustomer } from "@lib/data/customer";
import { getBaseURL } from "@lib/util/env";
import { StoreCartShippingOption } from "@medusajs/types";
import CartMismatchBanner from "@modules/layout/components/cart-mismatch-banner";
import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";
import FreeShippingPriceNudge from "@modules/shipping/components/free-shipping-price-nudge";
import { CartDrawerProvider } from "@modules/cart/components/cart-drawer";
import PromoActivation from "@modules/common/components/promo-activation";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { getActiveDiscount } from "@lib/data/promotions";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
};

const ANNOUNCEMENT_BAR_ENABLED = true;

export default async function PageLayout(props: { children: React.ReactNode }) {
  const customer = await retrieveCustomer();
  const cart = await retrieveCart();
  // Visitors who already activated the promo see their discounted prices, so
  // the bar has nothing left to offer them.
  const discount = await getActiveDiscount();
  let shippingOptions: StoreCartShippingOption[] = [];

  if (cart) {
    const { shipping_options } = await listCartOptions();

    shippingOptions = shipping_options;
  }

  return (
    <CartDrawerProvider cart={cart}>
      <PromoActivation />
      {ANNOUNCEMENT_BAR_ENABLED && !discount && (
        <div className="bg-wj-dark text-wj-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-2 text-center font-body text-[13px]">
            Welkom op onze website, krijg nu 10% korting met kortingscode{" "}
            <span className="font-semibold">WELKOM10</span>. Direct de prijzen
            zien?{" "}
            <LocalizedClientLink
              href="/?promo=WELKOM10"
              className="group font-semibold underline underline-offset-2 inline-flex items-center gap-1"
            >
              Klik hier!
              <span className="inline-block animate-nudge group-hover:animate-none group-hover:translate-x-1 transition-transform motion-reduce:animate-none">
                &rarr;
              </span>
            </LocalizedClientLink>
          </div>
        </div>
      )}
      <Nav />
      {customer && cart && (
        <CartMismatchBanner customer={customer} cart={cart} />
      )}

      {cart && (
        <FreeShippingPriceNudge
          variant="popup"
          cart={cart}
          shippingOptions={shippingOptions}
        />
      )}
      {props.children}
      <Footer />
    </CartDrawerProvider>
  );
}
