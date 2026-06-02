import { Metadata } from "next";

import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import StoreTemplate from "@modules/store/templates";

export const metadata: Metadata = {
  title: "Winkel — W&J Houtbouw",
  description:
    "Robuust buitenmeubilair van Douglas hout, handgemaakt in Drachten. Picknicktafels, tuinbanken en rondetafels.",
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
