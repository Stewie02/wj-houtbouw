"use client"

import { HttpTypes } from "@medusajs/types"
import Item from "@modules/cart/components/item"

type ItemsPreviewTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsPreviewTemplateProps) => {
  const items = cart.items
    ?.slice()
    .sort((a, b) => ((a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1))

  return (
    <div
      className={items && items.length > 4 ? "max-h-[340px] overflow-y-auto no-scrollbar" : undefined}
      data-testid="items-table"
    >
      {items?.map((item) => (
        <Item key={item.id} item={item} type="preview" currencyCode={cart.currency_code} />
      ))}
    </div>
  )
}

export default ItemsPreviewTemplate
