import { HttpTypes } from "@medusajs/types";

import Item from "@modules/order/components/item";

type ItemsProps = {
  order: HttpTypes.StoreOrder;
};

const Items = ({ order }: ItemsProps) => {
  const items = order.items
    ?.slice()
    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1));

  return (
    <div className="bg-wj-white border border-wj-border p-6 sm:p-8">
      <h2 className="font-display font-semibold text-[20px] text-wj-text tracking-[-0.01em] mb-6">
        Bestelde artikelen
      </h2>
      <div
        className="flex flex-col divide-y divide-wj-border"
        data-testid="products-table"
      >
        {items?.map((item) => (
          <Item key={item.id} item={item} currencyCode={order.currency_code} />
        ))}
      </div>
    </div>
  );
};

export default Items;
