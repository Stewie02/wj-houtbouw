"use server";

import { sdk } from "@lib/config";
import { applyPromotions } from "./cart";
import {
  getAuthHeaders,
  getCartId,
  getPromoCode,
  setPromoCode,
} from "./cookies";

type PromotionLookup = {
  code: string;
  percentage: number;
  isValid: boolean;
};

// Looks up a promotion by code via the custom backend endpoint. Cached
// (the percentage for a code is the same for everyone) and never throws for an
// unknown code — the endpoint returns { isValid: false }.
async function fetchPromotion(code: string): Promise<PromotionLookup> {
  const headers = { ...(await getAuthHeaders()) };

  return sdk.client.fetch<PromotionLookup>(
    `/store/custom/promotion/${encodeURIComponent(code)}`,
    {
      method: "GET",
      headers,
      cache: "force-cache",
      next: { tags: ["promotions"] },
    }
  );
}

/**
 * Called when a visitor arrives via a campaign link (?promo=CODE), from a QR
 * code, social media, email or anywhere else. Validates the code,
 * stores it in a session cookie, and applies it to the cart if one already
 * exists (otherwise addConfiguredItem applies it when the first item is added).
 */
export async function activatePromo(
  code: string
): Promise<{ valid: boolean; percentage: number }> {
  const promo = await fetchPromotion(code);

  if (!promo.isValid) {
    return { valid: false, percentage: 0 };
  }

  await setPromoCode(promo.code);

  const cartId = await getCartId();
  if (cartId) {
    await applyPromotions([promo.code]);
  }

  return { valid: true, percentage: promo.percentage };
}

/**
 * The active discount for the current visitor, or null. Used everywhere prices
 * are rendered to show crossed-out personal discount prices.
 */
export async function getActiveDiscount(): Promise<{
  code: string;
  percentage: number;
} | null> {
  const code = await getPromoCode();
  if (!code) return null;

  const promo = await fetchPromotion(code);
  if (!promo.isValid) return null;

  return { code: promo.code, percentage: promo.percentage };
}
