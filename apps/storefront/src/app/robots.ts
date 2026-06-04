import { MetadataRoute } from "next";
import { getBaseURL } from "@lib/util/env";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseURL();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/checkout",
        "/afrekenen",
        "/account",
        "/cart",
        "/winkelwagen",
        "/api/",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
