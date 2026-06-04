import { Metadata } from "next";
import { notFound } from "next/navigation";
import { listProducts } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import { getBaseURL } from "@lib/util/env";
import ProductTemplate from "@modules/products/templates";
import { JsonLd } from "@modules/common/components/json-ld";
import { HttpTypes } from "@medusajs/types";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<{ v_id?: string }>;
};

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images;
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId);
  if (!variant || !variant.images?.length) {
    return product.images;
  }

  const imageIdsMap = new Map(variant.images!.map((i) => [i.id, true]));
  return product.images?.filter((i) => imageIdsMap.has(i.id)) ?? null;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { handle } = params;
  const region = await getRegion();

  if (!region) {
    notFound();
  }

  const product = await listProducts({
    queryParams: { handle },
  }).then(({ response }) => response.products[0]);

  if (!product) {
    notFound();
  }

  const description = product.subtitle || product.title;
  return {
    title: product.title,
    description,
    alternates: {
      canonical: `/producten/${handle}`,
    },
    openGraph: {
      title: product.title,
      description,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const region = await getRegion();
  const searchParams = await props.searchParams;

  const selectedVariantId = searchParams.v_id;

  if (!region) {
    notFound();
  }

  const pricedProduct = await listProducts({
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0]);

  const images = getImagesForVariant(pricedProduct, selectedVariantId);

  if (!pricedProduct) {
    notFound();
  }

  const base = getBaseURL();

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "ProductGroup",
          name: pricedProduct.title,
          description: pricedProduct.subtitle || pricedProduct.description,
          url: `${base}/producten/${pricedProduct.handle}`,
          image: pricedProduct.images?.map((i) => i.url) ?? [],
          brand: {
            "@type": "Brand",
            "@id": `${base}/#organization`,
          },
          productGroupID: pricedProduct.handle,
          variesBy: pricedProduct.options?.map((o) => o.title) ?? [],
          hasVariant:
            pricedProduct.variants?.map((variant) => ({
              "@type": "Product",
              name: variant.title
                ? `${pricedProduct.title} — ${variant.title}`
                : pricedProduct.title,
              sku: variant.sku,
              url: `${base}/producten/${pricedProduct.handle}?v_id=${variant.id}`,
              image: variant.images?.length
                ? variant.images.map((i) => i.url)
                : (pricedProduct.images?.map((i) => i.url) ?? []),
              additionalProperty:
                variant.options?.map((o) => ({
                  "@type": "PropertyValue",
                  name:
                    pricedProduct.options?.find((po) => po.id === o.option_id)
                      ?.title ?? o.option_id,
                  value: o.value,
                })) ?? [],
              offers: {
                "@type": "Offer",
                url: `${base}/producten/${pricedProduct.handle}?v_id=${variant.id}`,
                priceCurrency:
                  variant.calculated_price?.currency_code?.toUpperCase() ??
                  "EUR",
                ...(variant.calculated_price?.calculated_amount != null
                  ? {
                      price: parseFloat(
                        (variant.calculated_price.calculated_amount / 100).toFixed(2)
                      ),
                    }
                  : {}),
                availability:
                  !variant.manage_inventory ||
                  (variant.inventory_quantity ?? 0) > 0
                    ? "https://schema.org/InStock"
                    : "https://schema.org/OutOfStock",
                seller: {
                  "@type": "Organization",
                  "@id": `${base}/#organization`,
                },
              },
            })) ?? [],
        }}
      />
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: base,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Producten",
              item: `${base}/winkel`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: pricedProduct.title,
              item: `${base}/producten/${pricedProduct.handle}`,
            },
          ],
        }}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        images={images ?? []}
      />
    </>
  );
}
