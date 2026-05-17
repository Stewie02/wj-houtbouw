"use client";

import PaymentButton from "../payment-button";
import { useSearchParams } from "next/navigation";
import { HttpTypes } from "@medusajs/types";
import { clx } from "@modules/common/components/ui";

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("step") === "review";

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards &&
    ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])
      ?.length > 0 &&
    cart?.total === 0
  );

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    (cart.payment_collection || paidByGiftcard);

  return (
    <div
      className={clx("bg-wj-white border border-wj-border p-6 sm:p-8 mb-4", {
        "opacity-40 pointer-events-none select-none": !isOpen,
      })}
    >
      <h2 className="font-display font-bold text-[20px] text-wj-text tracking-[-0.01em] mb-6">
        Review &amp; place order
      </h2>

      {isOpen && previousStepsCompleted && (
        <div className="flex flex-col gap-6">
          <p className="font-body text-[14px] text-wj-muted leading-[1.7]">
            By clicking <strong className="text-wj-text">Place order</strong>,
            you confirm that you have read, understand and accept our Terms of
            Use, Terms of Sale and Returns Policy and acknowledge that you have
            read our Privacy Policy.
          </p>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </div>
      )}
    </div>
  );
};

export default Review;
