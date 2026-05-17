"use server";

import { sdk } from "@lib/config";
import { HttpTypes } from "@medusajs/types";
import { getCacheOptions } from "./cookies";

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions("regions")),
  };

  return await sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: "GET",
      next,
      cache: "force-cache",
    })
    .then(({ regions }) => regions);
};

const regionMap = new Map<string, HttpTypes.StoreRegion>();

export const getRegion = async () => {
  const countryCode = process.env.NEXT_PUBLIC_DEFAULT_REGION || "nl";

  if (regionMap.has(countryCode)) {
    return regionMap.get(countryCode);
  }

  const regions = await listRegions();

  if (!regions) {
    return null;
  }

  regions.forEach((region) => {
    region.countries?.forEach((c) => {
      regionMap.set(c?.iso_2 ?? "", region);
    });
  });

  return regionMap.get(countryCode) ?? null;
};
