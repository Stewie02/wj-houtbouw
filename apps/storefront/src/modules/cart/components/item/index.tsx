"use client";

import { updateLineItem } from "@lib/data/cart";
import { HttpTypes } from "@medusajs/types";
import ErrorMessage from "@modules/checkout/components/error-message";
import DeleteButton from "@modules/common/components/delete-button";
import LineItemOptions from "@modules/common/components/line-item-options";
import LineItemPrice from "@modules/common/components/line-item-price";
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import Spinner from "@modules/common/icons/spinner";
import PlaceholderImage from "@modules/common/components/placeholder-image";
import Image from "next/image";
import { useState } from "react";

type ItemProps = {
  item: HttpTypes.StoreCartLineItem;
  type?: "full" | "preview";
  currencyCode: string;
};

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeQuantity = async (quantity: number) => {
    setError(null);
    setUpdating(true);
    await updateLineItem({ lineId: item.id, quantity })
      .catch((err) => setError(err.message))
      .finally(() => setUpdating(false));
  };

  const maxQuantity = 10;

  if (type === "preview") {
    return (
      <div className="flex gap-3 items-center py-2" data-testid="product-row">
        <div className="w-12 h-12 shrink-0 border border-wj-border overflow-hidden relative">
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.product_title ?? ""}
              fill
              className="object-cover object-center"
              sizes="48px"
            />
          ) : (
            <PlaceholderImage label={item.product_title ?? ""} />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-body text-[13px] font-medium text-wj-text truncate">
            {item.product_title}
          </p>
          <LineItemOptions
            metadata={item.metadata as Record<string, unknown> | null}
            data-testid="product-variant"
          />
        </div>
        <div className="text-right shrink-0">
          <p className="font-body text-[12px] text-wj-muted">
            {item.quantity}×
          </p>
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="py-6 grid grid-cols-1 sm:grid-cols-[1fr_120px_80px_100px] gap-4 items-center"
      data-testid="product-row"
    >
      {/* Product info */}
      <div className="flex gap-4 items-center">
        <LocalizedClientLink
          href={`/producten/${item.product_handle}`}
          className="w-20 h-20 shrink-0 border border-wj-border overflow-hidden relative"
        >
          {item.thumbnail ? (
            <Image
              src={item.thumbnail}
              alt={item.product_title ?? ""}
              fill
              className="object-cover object-center"
              sizes="80px"
            />
          ) : (
            <PlaceholderImage label={item.product_title ?? ""} />
          )}
        </LocalizedClientLink>
        <div className="flex-1 min-w-0">
          <LocalizedClientLink href={`/producten/${item.product_handle}`}>
            <p
              className="font-body font-semibold text-[15px] text-wj-text hover:text-wj-green transition-colors"
              data-testid="product-title"
            >
              {item.product_title}
            </p>
          </LocalizedClientLink>
          <LineItemOptions
            metadata={item.metadata as Record<string, unknown> | null}
            data-testid="product-variant"
          />
          <span className="hidden sm:inline-flex mt-1">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
          </span>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2 sm:justify-center">
        <div className="flex items-center border border-wj-border">
          <button
            onClick={() =>
              item.quantity > 1 && changeQuantity(item.quantity - 1)
            }
            disabled={updating || item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center font-body text-[14px] text-wj-text hover:bg-wj-surface transition-colors disabled:opacity-40"
          >
            −
          </button>
          <span className="w-8 h-8 flex items-center justify-center font-body text-[14px] text-wj-text border-x border-wj-border">
            {updating ? <Spinner /> : item.quantity}
          </span>
          <button
            onClick={() => changeQuantity(item.quantity + 1)}
            disabled={updating || item.quantity >= maxQuantity}
            className="w-8 h-8 flex items-center justify-center font-body text-[14px] text-wj-text hover:bg-wj-surface transition-colors disabled:opacity-40"
          >
            +
          </button>
        </div>
        <div className="sm:hidden">
          <DeleteButton id={item.id} data-testid="product-delete-button" />
        </div>
      </div>

      {/* Unit price */}
      <div className="hidden sm:block text-right">
        <LineItemUnitPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>

      {/* Total */}
      <div className="text-right font-body font-semibold text-[15px] text-wj-text">
        <LineItemPrice item={item} style="tight" currencyCode={currencyCode} />
      </div>

      {error && (
        <div className="col-span-full">
          <ErrorMessage error={error} data-testid="product-error-message" />
        </div>
      )}
    </div>
  );
};

export default Item;
