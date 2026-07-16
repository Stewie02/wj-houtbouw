"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { activatePromo } from "@lib/data/promotions";
import BrandButton from "@modules/common/components/brand-button";
import X from "@modules/common/icons/x";

type State =
  | { status: "idle" }
  | { status: "welcome"; percentage: number }
  | { status: "invalid" };

function PromoActivationInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("promo");
  const [state, setState] = useState<State>({ status: "idle" });
  const handled = useRef<string | null>(null);

  useEffect(() => {
    if (!code || handled.current === code) return;
    handled.current = code;

    activatePromo(code).then(({ valid, percentage }) => {
      setState(
        valid ? { status: "welcome", percentage } : { status: "invalid" }
      );
      // Re-render server components so they pick up the new promo cookie and
      // render the personal discount prices.
      if (valid) router.refresh();
    });
  }, [code, router]);

  if (state.status === "invalid") {
    return <InvalidNotice onClose={() => setState({ status: "idle" })} />;
  }

  return (
    <WelcomeModal
      isOpen={state.status === "welcome"}
      percentage={state.status === "welcome" ? state.percentage : 0}
      close={() => setState({ status: "idle" })}
    />
  );
}

function WelcomeModal({
  isOpen,
  percentage,
  close,
}: {
  isOpen: boolean;
  percentage: number;
  close: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[80]" onClose={close}>
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-[440px] bg-wj-white border border-wj-border p-7 sm:p-9 relative"
                data-testid="promo-welcome-modal"
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Sluiten"
                  className="absolute top-4 right-4 p-1 text-wj-muted hover:text-wj-text transition-colors"
                >
                  <X size="20" />
                </button>

                <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-wood mb-3">
                  Persoonlijke korting
                </p>

                <Dialog.Title className="font-display font-bold text-[26px] sm:text-[30px] text-wj-text tracking-[-0.02em] mb-4">
                  Welkom bij W&amp;J Houtbouw
                </Dialog.Title>

                <p className="font-body text-[15px] text-wj-muted leading-[1.7] mb-6">
                  Leuk dat je er bent. Je persoonlijke korting van {percentage}%
                  is automatisch geactiveerd. Alle prijzen die je op de website
                  ziet zijn jouw persoonlijke kortingsprijzen.
                </p>

                <BrandButton onClick={close} full>
                  Bekijk het assortiment
                </BrandButton>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function InvalidNotice({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] w-[calc(100%-2rem)] max-w-[440px] bg-wj-white border border-wj-border px-5 py-4 flex items-start gap-3"
      role="status"
      data-testid="promo-invalid-notice"
    >
      <p className="font-body text-[14px] text-wj-muted leading-[1.6] flex-1">
        Deze promotiecode is niet meer geldig. Je ziet de normale prijzen.
      </p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Sluiten"
        className="p-0.5 text-wj-muted hover:text-wj-text transition-colors shrink-0"
      >
        <X size="16" />
      </button>
    </div>
  );
}

// useSearchParams needs a Suspense boundary so pages can still render statically.
export default function PromoActivation() {
  return (
    <Suspense fallback={null}>
      <PromoActivationInner />
    </Suspense>
  );
}
