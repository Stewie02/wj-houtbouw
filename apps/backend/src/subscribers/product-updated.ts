import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";

export default async function productUpdatedHandler({
  event: { data: _data },
}: SubscriberArgs<{ id: string }>) {
  const url = `${process.env.STOREFRONT_URL}/api/revalidate?tags=products`;
  console.log(`[product.updated] Revalidating storefront cache: ${url}`);

  try {
    const res = await fetch(url);
    console.log(`[product.updated] Revalidation response: ${res.status}`);
  } catch (err) {
    console.error(`[product.updated] Revalidation failed:`, err);
  }
}

export const config: SubscriberConfig = {
  event: [
    "product.updated",
    "product-variant.updated",
    "product-variant.created",
    "product-variant.deleted",
  ],
};
