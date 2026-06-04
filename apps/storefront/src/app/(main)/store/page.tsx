import { Metadata } from "next";
import { JsonLd } from "@modules/common/components/json-ld";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import StoreTemplate from "@modules/store/templates";
import { getBaseURL } from "@lib/util/env";

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
};

export async function generateMetadata({ searchParams }: Params): Promise<Metadata> {
  const { page } = await searchParams;
  const pageNum = page ? parseInt(page) : 1;

  return {
    title: "Winkel",
    description:
      "Robuust buitenmeubilair, handgemaakt in Drachten. Picknicktafels, loungesets en pergola's voor buiten.",
    alternates: {
      canonical: pageNum === 1 ? "/winkel" : `/winkel?page=${pageNum}`,
    },
  };
}

export default async function StorePage(props: Params) {
  const { sortBy, page } = await props.searchParams;
  const base = getBaseURL();

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
            {
              "@type": "ListItem",
              position: 2,
              name: "Winkel",
              item: `${base}/winkel`,
            },
          ],
        }}
      />
      <StoreTemplate sortBy={sortBy} page={page} />
    </>
  );
}
