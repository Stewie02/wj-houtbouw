"use client";

import { Dialog, Transition } from "@headlessui/react";
import {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { HttpTypes } from "@medusajs/types";
import { convertToLocale } from "@lib/util/money";
import Item from "@modules/cart/components/item";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import BrandButton from "@modules/common/components/brand-button";
import X from "@modules/common/icons/x";

type CartDrawerContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

export const useCartDrawer = () => {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) {
    throw new Error("useCartDrawer must be used within CartDrawerProvider");
  }
  return ctx;
};

// Mirrors getCheckoutStep in modules/cart/templates/summary.tsx
function checkoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) return "address";
  if (cart?.shipping_methods?.length === 0) return "delivery";
  return "payment";
}

export function CartDrawerProvider({
  cart,
  children,
}: {
  cart: HttpTypes.StoreCart | null;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <CartDrawerContext.Provider value={{ isOpen, open, close }}>
      {children}
      <CartDrawer cart={cart} isOpen={isOpen} close={close} />
    </CartDrawerContext.Provider>
  );
}

function CartDrawer({
  cart,
  isOpen,
  close,
}: {
  cart: HttpTypes.StoreCart | null;
  isOpen: boolean;
  close: () => void;
}) {
  const items = cart?.items
    ?.slice()
    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1));
  const count = items?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[60]" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-wj-dark/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-screen max-w-[400px] h-full bg-wj-bg border-l border-wj-border flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-5 h-[64px] border-b border-wj-border shrink-0">
                  <Dialog.Title className="font-display font-bold text-[18px] text-wj-text tracking-[-0.01em]">
                    Winkelwagen{count > 0 ? ` (${count})` : ""}
                  </Dialog.Title>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Sluiten"
                    className="p-1 text-wj-muted hover:text-wj-text transition-colors"
                  >
                    <X size="20" />
                  </button>
                </div>

                {count === 0 || !cart ? (
                  <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 text-center">
                    <p className="font-body text-[15px] text-wj-muted">
                      Je winkelwagen is nog leeg.
                    </p>
                    <BrandButton onClick={close}>Verder winkelen</BrandButton>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto px-5 divide-y divide-wj-border">
                      {items?.map((item) => (
                        <Item
                          key={item.id}
                          item={item}
                          type="preview"
                          currencyCode={cart.currency_code}
                        />
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-wj-border px-5 py-4 shrink-0 flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="font-body text-[14px] text-wj-muted">
                          Subtotaal
                        </span>
                        <span className="font-body font-semibold text-[16px] text-wj-text">
                          {convertToLocale({
                            amount: cart.item_total ?? 0,
                            currency_code: cart.currency_code,
                          })}
                        </span>
                      </div>
                      <p className="font-body text-[12px] text-wj-muted">
                        Verzending wordt berekend bij het afrekenen.
                      </p>
                      <LocalizedClientLink
                        href={`/checkout?step=${checkoutStep(cart)}`}
                        onClick={() => {
                          window.fbq?.("track", "InitiateCheckout", {
                            value: cart.total,
                            currency: (
                              cart.currency_code ?? "eur"
                            ).toUpperCase(),
                            num_items: cart.items?.length,
                          });
                          close();
                        }}
                      >
                        <BrandButton size="lg" full>
                          Afrekenen
                        </BrandButton>
                      </LocalizedClientLink>
                      <LocalizedClientLink href="/winkelwagen" onClick={close}>
                        <BrandButton size="lg" variant="outline" full>
                          Bekijk winkelwagen
                        </BrandButton>
                      </LocalizedClientLink>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
