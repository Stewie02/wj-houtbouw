"use client";

import { addToCart } from "@lib/data/cart";
import { getProductMinPrice, getVariantForOptions, MinPrice } from "@lib/data/products";
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

function getButtonLabel(
  variantLoading: boolean,
  selectedVariant: HttpTypes.StoreProductVariant | null,
  variantNotFound: boolean,
  inStock: boolean
): string {
  if (variantLoading) return "Laden...";
  if (variantNotFound) return "Combinatie niet beschikbaar";
  if (!selectedVariant) return "Kies een variant";
  if (!inStock) return "Niet op voorraad";
  return "In winkelwagen";
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
  const [selectedVariant, setSelectedVariant] =
    useState<HttpTypes.StoreProductVariant | null>(null);
  const [variantLoading, setVariantLoading] = useState(() => {
    const opts = product.options ?? [];
    return opts.length > 0 && opts.every((opt) => !!searchParams.get(opt.id));
  });
  const [variantNotFound, setVariantNotFound] = useState(false);
  const didMountRef = useRef(false);
  const [minPrice, setMinPrice] = useState<MinPrice | null>(null);

  useEffect(() => {
    if (!product.id) return;

    const optionCount = product.options?.length ?? 0;
    const selectedEntries = Object.entries(options).filter(([, v]) => v !== undefined);
    const allSelected = optionCount > 0 && selectedEntries.length === optionCount;

    // When all options are selected the variant price takes over
    if (allSelected) return;

    const partialOptions =
      selectedEntries.length > 0
        ? (Object.fromEntries(selectedEntries) as Record<string, string>)
        : undefined;

    getProductMinPrice(product.id, partialOptions).then((p) => setMinPrice(p ?? null));
  }, [options, product.id, product.options?.length]);

  // Fetch the matching variant whenever the user completes their option selection
  useEffect(() => {
    const optionCount = product.options?.length ?? 0;
    const allSelected =
      optionCount === 0 ||
      (Object.keys(options).length === optionCount &&
        Object.values(options).every((v) => v !== undefined));

    if (!allSelected || !product.id) {
      setSelectedVariant(null);
      setVariantNotFound(false);
      return;
    }

    let cancelled = false;
    setVariantLoading(true);
    setVariantNotFound(false);

    getVariantForOptions({
      productId: product.id,
      selectedOptions: options as Record<string, string>,
    })
      .then((variant) => {
        if (cancelled) return;
        setSelectedVariant(variant);
        setVariantNotFound(!variant);
        setVariantLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setSelectedVariant(null);
        setVariantNotFound(true);
        setVariantLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [options, product.id, product.options?.length]);

  // Sync option selections and variant ID to URL (skip on initial mount)
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
    if (selectedVariant?.id) params.set("v_id", selectedVariant.id);

    const newSearch = params.toString();
    if (newSearch === searchParams.toString()) return;
    router.replace(pathname + (newSearch ? "?" + newSearch : ""), { scroll: false });
  }, [selectedVariant, options]);

  const inStock =
    !!selectedVariant &&
    (!selectedVariant.manage_inventory ||
      !!selectedVariant.allow_backorder ||
      (selectedVariant.inventory_quantity ?? 0) > 0);

  const actionsRef = useRef<HTMLDivElement>(null);
  const inView = useIntersection(actionsRef, "0px");

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return;
    setIsAdding(true);
    await addToCart({ variantId: selectedVariant.id, quantity: 1 });
    setIsAdding(false);
  };

  const hasOptions = (product.options?.length ?? 0) > 0;
  const buttonLabel = getButtonLabel(variantLoading, selectedVariant, variantNotFound, inStock);

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

        <ProductPrice variant={selectedVariant} isLoading={variantLoading} minPrice={minPrice} />

        <BrandButton
          size="lg"
          full
          onClick={handleAddToCart}
          disabled={
            !inStock || !selectedVariant || !!disabled || isAdding || variantNotFound
          }
          data-testid="add-product-button"
        >
          {isAdding ? "Toevoegen..." : buttonLabel}
        </BrandButton>

        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={(id, val) =>
            setOptions((prev) => ({ ...prev, [id]: val }))
          }
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  );
}
