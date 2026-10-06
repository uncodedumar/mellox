import { describe, expect, it } from "vitest";
import robots, { AI_USER_AGENTS } from "@/app/robots";
import { getPostIndex } from "@/lib/blog-index";
import { FEATURES } from "@/lib/features";
import { buildLlmsFullTxt, buildLlmsTxt } from "@/lib/llms";
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
