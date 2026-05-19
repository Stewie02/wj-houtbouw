"use client";

import React from "react";

import { applyPromotions } from "@lib/data/cart";
import { convertToLocale } from "@lib/util/money";
import { HttpTypes } from "@medusajs/types";
import Trash from "@modules/common/icons/trash";
import ErrorMessage from "../error-message";
import { SubmitButton } from "../submit-button";

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart;
};

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const { promotions = [] } = cart;

  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    );
    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    );
  };

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("");
    const code = formData.get("code");
    if (!code) return;

    const input = document.getElementById(
      "promotion-input"
    ) as HTMLInputElement;
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!);
    codes.push(code.toString());

    try {
      await applyPromotions(codes);
    } catch (e) {
      setErrorMessage(e instanceof Error ? e.message : String(e));
    }

    if (input) input.value = "";
  };

  return (
    <div className="w-full flex flex-col">
      <form action={(a) => addPromotionCode(a)} className="w-full mb-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="font-body text-[13px] font-medium text-wj-green hover:underline mb-2"
          data-testid="add-discount-button"
        >
          Promotiecode toevoegen
        </button>

        {isOpen && (
          <>
            <div className="flex w-full gap-x-2">
              <input
                className="w-full border border-wj-border bg-wj-white font-body text-[14px] text-wj-text px-3 py-2 focus:outline-none focus:border-wj-text transition-colors"
                id="promotion-input"
                name="code"
                type="text"
                autoFocus={false}
                data-testid="discount-input"
              />
              <SubmitButton variant="secondary" data-testid="discount-apply-button">
                Toepassen
              </SubmitButton>
            </div>
            <ErrorMessage
              error={errorMessage}
              data-testid="discount-error-message"
            />
          </>
        )}
      </form>

      {promotions.length > 0 && (
        <div className="w-full flex flex-col gap-2 mb-2">
          <p className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted">
            Toegepaste promotie(s)
          </p>
          {promotions.map((promotion) => (
            <div
              key={promotion.id}
              className="flex items-center justify-between w-full"
              data-testid="discount-row"
            >
              <span
                className="font-body text-[13px] text-wj-text truncate pr-2"
                data-testid="discount-code"
              >
                {promotion.code}
                {promotion.application_method?.value !== undefined &&
                  promotion.application_method.currency_code !== undefined && (
                    <span className="text-wj-muted ml-1">
                      (
                      {promotion.application_method.type === "percentage"
                        ? `${promotion.application_method.value}%`
                        : convertToLocale({
                            amount: +promotion.application_method.value,
                            currency_code:
                              promotion.application_method.currency_code,
                          })}
                      )
                    </span>
                  )}
              </span>
              {!promotion.is_automatic && (
                <button
                  className="flex items-center text-wj-muted hover:text-red-600 transition-colors shrink-0"
                  onClick={() => {
                    if (!promotion.code) return;
                    removePromotionCode(promotion.code);
                  }}
                  data-testid="remove-discount-button"
                >
                  <Trash size={14} />
                  <span className="sr-only">Kortingscode verwijderen</span>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscountCode;
