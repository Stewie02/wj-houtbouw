"use server";

import { sdk } from "@lib/config";
import { sortProducts } from "@lib/util/sort-products";
import { HttpTypes } from "@medusajs/types";
import { SortOptions } from "@modules/store/components/refinement-list/sort-products";
import { getAuthHeaders } from "./cookies";
import { getRegion } from "./regions";

export const listProducts = async ({
  pageParam = 1,
  queryParams,
}: {
  pageParam?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams;
}> => {
  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  const region = await getRegion();

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const headers = {
    ...(await getAuthHeaders()),
  };

  const next = {
    tags: ["products"],
  };

  return sdk.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "*variants.calculated_price,+variants.inventory_quantity,*variants.images,+metadata,+tags,",
          ...queryParams,
        },
        headers,
        next,
        cache: "force-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null;

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      };
    });
};

/**
 * This will fetch 100 products to the Next.js cache and sort them based on the sortBy parameter.
 * It will then return the paginated products based on the page and limit parameters.
 */
export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = "created_at",
}: {
  page?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  sortBy?: SortOptions;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
  const limit = queryParams?.limit || 12;

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};

export const getVariantForOptions = async ({
  productId,
  selectedOptions,
}: {
  productId: string;
  selectedOptions: Record<string, string>;
}): Promise<HttpTypes.StoreProductVariant | null> => {
  const region = await getRegion();
  if (!region) return null;

  const headers = { ...(await getAuthHeaders()) };

  const { variant } = await sdk.client.fetch<{
    variant: HttpTypes.StoreProductVariant | null;
  }>(`/store/custom/products/${productId}/variant-lookup`, {
    method: "GET",
    query: {
      region_id: region.id,
      ...selectedOptions,
    },
    headers,
    cache: "no-store",
  });

  return variant;
};

export type MinPrice = {
  calculated_amount: number;
  currency_code: string;
};

export const getProductMinPrice = async (
  productId: string,
  partialOptions?: Record<string, string>
): Promise<MinPrice | null> => {
  const region = await getRegion();
  if (!region) return null;

  const headers = { ...(await getAuthHeaders()) };

  const { min_price } = await sdk.client.fetch<{
    min_price: MinPrice | null;
  }>(`/store/custom/products/${productId}/min-price`, {
    method: "GET",
    query: { region_id: region.id, ...partialOptions },
    headers,
    cache: "no-store",
  });

  return min_price;
};

export type SimpleProductOption = {
  id: string
  title: string
  values: string[]
}

export const getProductOptions = async (
  productId: string
): Promise<SimpleProductOption[]> => {
  const headers = { ...(await getAuthHeaders()) }

  const { options } = await sdk.client.fetch<{ options: SimpleProductOption[] }>(
    `/store/custom/products/${productId}/options`,
    {
      method: "GET",
      headers,
      cache: "force-cache",
      next: { tags: ["products"] },
    }
  )

  return options
}

export const listAllProductHandles = async (): Promise<
  { handle: string; updated_at?: string }[]
> => {
  return sdk.client
    .fetch<{ products: { handle: string; updated_at?: string }[] }>(
      "/store/products",
      {
        method: "GET",
        query: { limit: 500, fields: "handle,updated_at" },
        cache: "no-store",
      }
    )
    .then(({ products }) => products)
    .catch(() => []);
};

export type ProductSummary = {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  thumbnail: string | null;
  metadata: Record<string, unknown> | null;
  min_price: { calculated_amount: number; currency_code: string } | null;
};

export const listProductSummaries = async ({
  limit = 12,
  offset = 0,
  order = "position",
  collectionId,
  categoryId,
}: {
  limit?: number;
  offset?: number;
  order?: "created_at" | "price_asc" | "price_desc" | "position";
  collectionId?: string;
  categoryId?: string;
} = {}): Promise<{ products: ProductSummary[]; count: number }> => {
  const region = await getRegion();
  if (!region) return { products: [], count: 0 };

  const headers = { ...(await getAuthHeaders()) };

  const query: Record<string, unknown> = {
    region_id: region.id,
    limit,
    offset,
    order,
  };
  if (collectionId) query.collection_id = collectionId;
  if (categoryId) query.category_id = categoryId;

  return sdk.client
    .fetch<{ products: ProductSummary[]; count: number }>(
      "/store/custom/products/list",
      {
        method: "GET",
        query,
        headers,
        cache: "no-store",
      }
    )
    .catch(() => ({ products: [], count: 0 }));
};
