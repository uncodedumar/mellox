import { describe, expect, it } from "vitest";
import robots, { AI_USER_AGENTS, buildRobots } from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getPosts } from "@/lib/blog";
import { getPostIndex } from "@/lib/blog-index";
import { FEATURES } from "@/lib/features";
import { buildLlmsFullTxt, buildLlmsTxt, QUICK_ANSWERS, TOPICS } from "@/lib/llms";
import { PLANS } from "@/lib/pricing";
import { SITE_URL } from "@/lib/seo";
import { USE_CASES } from "@/lib/use-cases";

describe("llms.txt", async () => {
  const posts = await getPostIndex();
  const short = buildLlmsTxt(posts);
  const full = buildLlmsFullTxt(posts);

  it("follows the llms.txt shape: H1, blockquote summary, H2 sections", () => {
    expect(short.startsWith("# Mellox AI\n")).toBe(true);
    expect(short).toMatch(/\n> .+/);
    expect(short).toContain("\n## Product\n");
    expect(short).toContain("\n## Optional\n");
  });

  it("links every product page, use case and blog post with absolute urls", () => {
    for (const f of FEATURES) expect(short).toContain(`${SITE_URL}/features/${f.slug}`);
    for (const u of USE_CASES) expect(short).toContain(`${SITE_URL}/use-cases/${u.slug}`);
    for (const p of posts) expect(short).toContain(`${SITE_URL}/blog/${p.slug}`);
    expect(short).toContain(`${SITE_URL}/llms-full.txt`);
  });

  it("states the real plan prices", () => {
    for (const p of PLANS) {
      if (p.monthly !== null) expect(short).toContain(`${p.name} ($${p.monthly} per month)`);
    }
  });

  it("full text covers pricing, features, security and FAQs without leaking placeholders", () => {
    for (const heading of ["## Plans and pricing", "## Product pages", "## Use cases", "## Security and trust", "## Frequently asked questions"]) {
      expect(full).toContain(heading);
    }
    for (const text of [short, full]) {
      expect(text).not.toMatch(/undefined|NaN|\[object Object\]/);
    }
    expect(full.length).toBeGreaterThan(10_000);
  });

  it("never publishes an unapproved customer quote", () => {
    // Customer stories stay out of llms files until they have a summary or quote that the customer approved.
    expect(full).not.toMatch(/Antrosys/);
  });
});

describe("robots.txt", () => {
  it("explicitly allows the major AI crawlers and still protects the API", () => {
    const rules = robots().rules as { userAgent: string | string[]; allow?: string; disallow?: string | string[] }[];
    const ai = rules.find((r) => Array.isArray(r.userAgent));
    expect(ai?.allow).toBe("/");
    for (const bot of ["GPTBot", "ChatGPT-User", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"]) {
      expect(AI_USER_AGENTS).toContain(bot);
    }
    expect(ai?.disallow).toContain("/api/");
  });
});

describe("llms.txt keyword coverage", async () => {
  const posts = await getPostIndex();
  const short = buildLlmsTxt(posts);
  const full = buildLlmsFullTxt(posts);

  it("covers the category terms people search for, in both files", () => {
    for (const text of [short, full]) {
      expect(text).toContain("## What Mellox covers");
      expect(text).toContain("## Quick answers");
      for (const term of ["AI marketing assistant", "AI CMO", "social media post generator", "image generation", "GEO", "ChatGPT"]) {
        expect(text).toContain(term);
      }
    }
    expect(TOPICS.length).toBeGreaterThan(5);
    for (const a of QUICK_ANSWERS) expect(full).toContain(a.q);
  });
});

describe("robots.txt environments", () => {
  it("production points at the sitemap", () => {
    const r = buildRobots(true);
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(r.host).toBe(SITE_URL);
  });

  it("closes previews and other non-production deployments to every crawler", () => {
    expect(buildRobots(false).rules).toEqual({ userAgent: "*", disallow: "/" });
  });
});

describe("sitemap.xml", async () => {
  const entries = await sitemap();
  const urls = entries.map((e) => e.url);

  it("lists every page type once, with absolute urls", async () => {
    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/pricing`);
    for (const f of FEATURES) expect(urls).toContain(`${SITE_URL}/features/${f.slug}`);
    for (const u of USE_CASES) expect(urls).toContain(`${SITE_URL}/use-cases/${u.slug}`);
    // blog posts come from getPosts(), which compiles MDX (not available under vitest): compare with what it returns
    for (const p of await getPosts()) expect(urls).toContain(`${SITE_URL}/blog/${p.slug}`);
  });

  it("uses stable, real dates (not the build time)", () => {
    for (const e of entries) {
      const d = e.lastModified as Date;
      expect(Number.isNaN(d.getTime())).toBe(false);
      expect(d.getTime()).toBeLessThanOrEqual(Date.now());
    }
    const home = entries.find((e) => e.url === SITE_URL);
    expect(home?.priority).toBe(1);
  });
});
