import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { FEATURES } from "@/lib/features";
import { SITE_URL } from "@/lib/seo";
import { USE_CASES } from "@/lib/use-cases";

const STATIC = [
  "",
  "/pricing",
  "/compare",
  "/demo",
  "/about",
  "/integrations",
  "/security",
  "/docs",
  "/faq",
  "/blog",
  "/changelog",
  "/contact",
  "/contact/partner",
  "/contact/press",
  "/privacy",
  "/terms",
  "/cookies",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const now = new Date();
  return [
    ...STATIC.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/pricing" || path === "/demo" ? 0.9 : 0.7,
    })),
    ...FEATURES.map((f) => ({ url: `${SITE_URL}/features/${f.slug}`, lastModified: now, priority: 0.8 })),
    ...USE_CASES.map((u) => ({ url: `${SITE_URL}/use-cases/${u.slug}`, lastModified: now, priority: 0.8 })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(`${p.date}T00:00:00Z`), priority: 0.6 })),
  ];
}
