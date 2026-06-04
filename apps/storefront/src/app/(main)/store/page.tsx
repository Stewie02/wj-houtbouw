import { Metadata } from "next";

import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import StoreTemplate from "@modules/store/templates";

export const metadata: Metadata = {
  title: "Winkel",
  description:
    "Robuust buitenmeubilair, handgemaakt in Drachten. Picknicktafels, loungesets en pergola's voor buiten.",
  alternates: {
    canonical: "/winkel",
  },
};

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions;
    page?: string;
  }>;
};

export default async function StorePage(props: Params) {
  const { sortBy, page } = await props.searchParams;

  return <StoreTemplate sortBy={sortBy} page={page} />;
}
