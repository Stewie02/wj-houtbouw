import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Shop — WJ Houtbouw",
  description: "Three handcrafted outdoor furniture products, refined since 2009. Picnic tables, garden benches and round garden tables.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export default async function StorePage(props: Params) {
  const { sortBy, page } = await props.searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
    />
  )
}
