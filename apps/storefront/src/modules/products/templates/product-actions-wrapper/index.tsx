import { getProductOptions } from "@lib/data/products";
import { HttpTypes } from "@medusajs/types";
import ProductActions from "@modules/products/components/product-actions";

export default async function ProductActionsWrapper({
  product,
  discountPercentage,
}: {
  product: HttpTypes.StoreProduct;
  discountPercentage?: number | null;
}) {
  const simpleOptions = await getProductOptions(product.id);

  const enrichedProduct = {
    ...product,
    options: simpleOptions.map((o) => ({
      id: o.id,
      title: o.title,
      product_id: product.id,
      metadata: o.metadata,
      values: o.values.map((v) => ({ id: v, value: v, option_id: o.id })),
    })),
  } as HttpTypes.StoreProduct;

  return (
    <ProductActions
      product={enrichedProduct}
      discountPercentage={discountPercentage}
    />
  );
}
