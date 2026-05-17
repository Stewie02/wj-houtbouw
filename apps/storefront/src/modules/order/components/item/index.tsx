import { HttpTypes } from "@medusajs/types";
import { convertToLocale } from "@lib/util/money";

import LineItemOptions from "@modules/common/components/line-item-options";
import Thumbnail from "@modules/products/components/thumbnail";

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem;
  currencyCode: string;
};

const Item = ({ item, currencyCode }: ItemProps) => {
  const unitPrice = convertToLocale({
    amount: item.unit_price ?? 0,
    currency_code: currencyCode,
  });
  const total = convertToLocale({
    amount: item.total ?? 0,
    currency_code: currencyCode,
  });

  return (
    <div
      className="flex gap-4 py-5 first:pt-0 last:pb-0"
      data-testid="product-row"
    >
      <div className="w-20 h-20 flex-shrink-0 bg-wj-surface overflow-hidden">
        <Thumbnail thumbnail={item.thumbnail} size="square" />
      </div>
      <div className="flex flex-1 justify-between gap-4 min-w-0">
        <div className="min-w-0">
          <p
            className="font-body font-medium text-[14px] text-wj-text truncate"
            data-testid="product-name"
          >
            {item.product_title}
          </p>
          <LineItemOptions
            variant={item.variant}
            data-testid="product-variant"
          />
          <p className="font-body text-[13px] text-wj-muted mt-1">
            Qty: <span data-testid="product-quantity">{item.quantity}</span>
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="font-body text-[13px] text-wj-muted">
            {unitPrice} each
          </p>
          <p className="font-body font-semibold text-[15px] text-wj-text mt-1">
            {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Item;
