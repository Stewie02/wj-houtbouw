import { getProductOptions } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import ProductActions from "@modules/products/components/product-actions";

export default async function ProductActionsWrapper({
  id,
  title,
}: {
  id: string;
  title?: string;
}) {
  const simpleOptions = await getProductOptions(id);

  const product = {
    id,
    title,
    options: simpleOptions.map((o) => ({
      id: o.id,
      title: o.title,
      product_id: id,
      values: o.values.map((v) => ({ id: v, value: v, option_id: o.id })),
    })),
  } as HttpTypes.StoreProduct;

  return <ProductActions product={product} />;
}
