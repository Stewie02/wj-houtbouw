import { MetadataRoute } from "next";
import { listAllProductHandles } from "@lib/data/products";
import { BLOG_POSTS } from "@lib/data/blog";
import { getBaseURL } from "@lib/util/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseURL();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/winkel`, priority: 0.9, changeFrequency: "daily" },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${base}/over-ons`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/contact`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/faq`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/cookie-policy`, priority: 0.3, changeFrequency: "yearly" },
    {
      url: `${base}/terms-and-conditions`,
      priority: 0.3,
      changeFrequency: "yearly",
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  const products = await listAllProductHandles();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/producten/${p.handle}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : undefined,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [...staticPages, ...blogPages, ...productPages];
}
