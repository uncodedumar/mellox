import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { RELEASES } from "@/lib/changelog";
import { FEATURES } from "@/lib/features";
import { PRIVACY_UPDATED } from "@/lib/privacy";
import { SITE_URL } from "@/lib/seo";
import { TERMS_UPDATED } from "@/lib/terms";
import { COOKIES_UPDATED } from "@/lib/cookies-policy";
import { USE_CASES } from "@/lib/use-cases";

type Entry = MetadataRoute.Sitemap[number];

// lastModified must be real. Search engines learn to ignore a sitemap whose dates change on every build, so dates here
// come from content: the newest changelog release for product pages, each post's own date, and each policy's own date.
const iso = (d: string) => new Date(`${d}T00:00:00Z`);
// "5 October 2026". A document can carry an effective date a day or two ahead; a sitemap must never say a page changed
// in the future, so that case is clamped to now.
const parse = (human: string) => {
  const d = new Date(`${human} UTC`);
  return d.getTime() > Date.now() ? new Date() : d;
};
const LATEST_RELEASE = RELEASES.map((r) => r.date).sort().at(-1) ?? "2026-10-01";

type Page = { path: string; priority: number; changeFrequency: Entry["changeFrequency"]; lastModified?: Date };

const PAGES: Page[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/compare", priority: 0.8, changeFrequency: "monthly" },
  { path: "/integrations", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/security", priority: 0.6, changeFrequency: "monthly" },
  { path: "/changelog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "yearly" },
  { path: "/contact/partner", priority: 0.4, changeFrequency: "yearly" },
  { path: "/contact/press", priority: 0.4, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", lastModified: parse(PRIVACY_UPDATED) },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", lastModified: parse(TERMS_UPDATED) },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly", lastModified: parse(COOKIES_UPDATED) },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const newestPost = posts.map((p) => p.date).sort().at(-1);
  const productDate = iso(LATEST_RELEASE);

  return [
    ...PAGES.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: p.lastModified ?? (p.path === "/blog" && newestPost ? iso(newestPost) : productDate),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...FEATURES.map((f) => ({
      url: `${SITE_URL}/features/${f.slug}`,
      lastModified: productDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...USE_CASES.map((u) => ({
      url: `${SITE_URL}/use-cases/${u.slug}`,
      lastModified: productDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: iso(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
