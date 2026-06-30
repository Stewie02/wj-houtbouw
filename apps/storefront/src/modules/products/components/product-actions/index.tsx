"use client";

import { addConfiguredItem } from "@lib/data/cart";
import { useIntersection } from "@lib/hooks/use-in-view";
import { HttpTypes } from "@medusajs/types";
import OptionSelect from "@modules/products/components/product-actions/option-select";
import ProductPrice from "../product-price";
import MobileActions from "./mobile-actions";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BrandButton from "@modules/common/components/brand-button";

type ProductActionsProps = {
  product: HttpTypes.StoreProduct;
  disabled?: boolean;
};

function parseSurcharge(raw: string): number {
  const match = raw.trim().match(/\+?€([\d]+(?:[.,]\d+)?)\s*$/)
  if (!match) return 0
  const surcharge = parseFloat(match[1].replace(",", "."))
  return isNaN(surcharge) ? 0 : surcharge
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [options, setOptions] = useState<Record<string, string | undefined>>(() => {
    const initial: Record<string, string | undefined> = {};
    for (const opt of product.options ?? []) {
      const val = searchParams.get(opt.id);
      if (val) initial[opt.id] = val;
    }
    return initial;
  });
  const [isAdding, setIsAdding] = useState(false);
  const [quantityInput, setQuantityInput] = useState("1");
  const didMountRef = useRef(false);

  const baseVariant = product.variants?.[0] ?? null;
  const basePrice = baseVariant?.calculated_price?.calculated_amount ?? null;
  const currency_code = (baseVariant?.calculated_price as { currency_code?: string } | null)?.currency_code ?? "eur";

  const optionCount = product.options?.length ?? 0;
  const selectedEntries = Object.entries(options).filter(([, v]) => v !== undefined);
  const allSelected = optionCount === 0 || selectedEntries.length === optionCount;

  const calculatedPrice =
    basePrice == null
      ? null
      : basePrice + selectedEntries.reduce((sum, [, raw]) => sum + parseSurcharge(raw!), 0);

  // Sync option selections to URL (skip on initial mount)
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    const params = new URLSearchParams();
    for (const opt of product.options ?? []) {
      const val = options[opt.id];
      if (val) params.set(opt.id, val);
    }
    const newSearch = params.toString();
    if (newSearch === searchParams.toString()) return;
    router.replace(pathname + (newSearch ? "?" + newSearch : ""), { scroll: false });
  }, [options]);

  useEffect(() => {
    window.fbq?.("track", "ViewContent", {
      content_ids: [product.id],
      content_name: product.title,
      content_type: "product",
    });
  }, []);

  const actionsRef = useRef<HTMLDivElement>(null);
  const inView = useIntersection(actionsRef, "0px");

  const handleAddToCart = async () => {
    if (!allSelected || !baseVariant?.id) return;
    const qty = Math.max(1, parseInt(quantityInput, 10) || 1);
    setIsAdding(true);
    await addConfiguredItem({
      variantId: baseVariant.id,
      quantity: qty,
      selectedOptions: options as Record<string, string>,
    });
    window.fbq?.("track", "AddToCart", {
      content_ids: [baseVariant.id],
      content_name: product.title,
      content_type: "product",
      value: calculatedPrice,
      currency: currency_code.toUpperCase(),
    });
    setIsAdding(false);
  };

  const hasOptions = optionCount > 0;
  const buttonLabel = !allSelected
    ? "Kies alle opties"
    : isAdding
      ? "Toevoegen..."
      : "In winkelwagen";

  return (
    <>
      <div ref={actionsRef} className="flex flex-col gap-6 mt-6">
        {hasOptions && (
          <div className="flex flex-col gap-5">
            {(product.options || []).map((option) => (
              <OptionSelect
                key={option.id}
                option={option}
                current={options[option.id]}
                updateOption={(id, val) =>
                  setOptions((prev) => ({ ...prev, [id]: val }))
                }
                title={option.title ?? ""}
                data-testid="product-options"
                disabled={!!disabled || isAdding}
              />
            ))}
          </div>
        )}

        <ProductPrice
          amount={calculatedPrice}
          currency_code={currency_code}
          isFrom={!allSelected && calculatedPrice != null}
        />

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-wj-border bg-wj-white self-stretch">
            <button
              type="button"
              onClick={() => setQuantityInput((s) => String(Math.max(1, (parseInt(s, 10) || 1) - 1)))}
              disabled={!!disabled || isAdding}
              className="w-12 h-full flex items-center justify-center text-wj-text hover:bg-wj-surface disabled:opacity-40 transition-colors text-lg"
              aria-label="Minder"
            >
              −
            </button>
            <input
              type="number"
              min={1}
              value={quantityInput}
              onChange={(e) => setQuantityInput(e.target.value)}
              disabled={!!disabled || isAdding}
              className="w-10 text-center font-body text-[15px] text-wj-text bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-40"
            />
            <button
              type="button"
              onClick={() => setQuantityInput((s) => String((parseInt(s, 10) || 1) + 1))}
              disabled={!!disabled || isAdding}
              className="w-12 h-full flex items-center justify-center text-wj-text hover:bg-wj-surface disabled:opacity-40 transition-colors text-lg"
              aria-label="Meer"
            >
              +
            </button>
          </div>
          <BrandButton
            size="lg"
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!allSelected || !!disabled || isAdding}
            data-testid="add-product-button"
          >
            {buttonLabel}
          </BrandButton>
        </div>

        <MobileActions
          product={product}
          amount={calculatedPrice}
          currency_code={currency_code}
          isFrom={!allSelected && calculatedPrice != null}
          options={options}
          updateOptions={(id, val) =>
            setOptions((prev) => ({ ...prev, [id]: val }))
          }
          allSelected={allSelected}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  );
}
