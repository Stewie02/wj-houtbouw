import { HttpTypes } from "@medusajs/types";
import Item from "@modules/cart/components/item";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart;
};

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
    ?.slice()
    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1));

  return (
    <div className="flex flex-col gap-6">
      {/* Header row */}
      <div className="hidden sm:grid grid-cols-[1fr_120px_80px_100px] gap-4 pb-3 border-b border-wj-border">
        <span className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted">
          Product
        </span>
        <span className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted text-center">
          Aantal
        </span>
        <span className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted text-right">
          Prijs
        </span>
        <span className="font-body font-semibold text-[11px] tracking-[0.08em] uppercase text-wj-muted text-right">
          Totaal
        </span>
      </div>

      {/* Items */}
      <div
        className="flex flex-col divide-y divide-wj-border"
        data-testid="items-table"
      >
        {items?.map((item) => (
          <Item
            key={item.id}
            item={item}
            currencyCode={cart?.currency_code ?? ""}
          />
        ))}
      </div>

      {/* Continue shopping */}
      <div className="pt-2">
        <LocalizedClientLink
          href="/winkel"
          className="font-body text-[13px] font-medium text-wj-green hover:underline inline-flex items-center gap-1.5"
        >
          ← Verder winkelen
        </LocalizedClientLink>
      </div>
    </div>
  );
};

export default ItemsTemplate;
