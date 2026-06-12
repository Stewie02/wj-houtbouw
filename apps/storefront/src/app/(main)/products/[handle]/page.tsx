import { Metadata } from "next";
import { notFound } from "next/navigation";
import { listProducts } from "@lib/data/products";
import { getRegion } from "@lib/data/regions";
import { getBaseURL } from "@lib/util/env";
import ProductTemplate from "@modules/products/templates";
import { JsonLd } from "@modules/common/components/json-ld";

type Props = {
  params: Promise<{ handle: string }>;
  searchParams: Promise<Record<string, never>>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { handle } = params;
  const region = await getRegion();

  if (!region) {
    notFound();
  }

  const product = await listProducts({
    queryParams: { handle, fields: "*options,+images,+metadata,+tags" },
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

  if (!region) {
    notFound();
  }

  const pricedProduct = await listProducts({
    queryParams: { handle: params.handle, fields: "*options,+images,+metadata,+tags" },
  }).then(({ response }) => response.products[0]);

  const images = pricedProduct?.images ?? [];

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
        images={images ?? []}
      />
    </>
  );
}
