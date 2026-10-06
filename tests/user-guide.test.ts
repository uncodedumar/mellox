import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { getPostIndex } from "@/lib/blog-index";
import { buildLlmsFullTxt, buildLlmsTxt, USER_GUIDE_PATH } from "@/lib/llms";
import { LEGAL_ADDRESS, LEGAL_ENTITY, PRIVACY, PRIVACY_PREFACE } from "@/lib/privacy";
import { SITE_URL } from "@/lib/seo";

const root = process.cwd();
const guide = readFileSync(path.join(root, "content", "user-guide.md"), "utf8");

describe("user guide (for AI assistants only)", () => {
  it("is the full guide, with its assistant instructions and troubleshooting", () => {
    expect(guide.startsWith("# How to Use Mellox AI")).toBe(true);
    expect(guide).toContain("For AI assistants reading this guide");
    expect(guide).toContain("Troubleshooting");
    expect(guide.length).toBeGreaterThan(20_000);
  });

  it("is announced to assistants in llms.txt and llms-full.txt", async () => {
    const posts = await getPostIndex();
    expect(buildLlmsTxt(posts)).toContain(`${SITE_URL}${USER_GUIDE_PATH}`);
    expect(buildLlmsFullTxt(posts)).toContain(`${SITE_URL}${USER_GUIDE_PATH}`);
  });

  it("is not in the sitemap", async () => {
    const urls = (await sitemap()).map((e) => e.url);
    expect(urls.some((u) => u.includes("user-guide"))).toBe(false);
  });

  it("is not linked from anywhere a visitor can click (components and pages)", () => {
    const hits: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const full = path.join(dir, name);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(tsx|css)$/.test(name) && readFileSync(full, "utf8").includes("user-guide")) hits.push(full);
      }
    };
    walk(path.join(root, "src"));
    expect(hits).toEqual([]);
  });
});

describe("privacy policy content", () => {
  it("has the 18 sections of the source document, each with content", () => {
    expect(PRIVACY).toHaveLength(18);
    for (const s of PRIVACY) expect(s.blocks?.length, s.title).toBeGreaterThan(0);
  });

  it("cookie section matches how the site really works (consent-gated tools)", () => {
    const text = JSON.stringify(PRIVACY.find((s) => s.title.startsWith("Cookies")));
    expect(text).toContain("only after you accept");
    expect(text).not.toContain("do not use advertising cookies");
  });

  it("keeps the legal entity fields in one place until they are filled in", () => {
    expect(PRIVACY_PREFACE.join(" ")).toContain(`${LEGAL_ENTITY}, ${LEGAL_ADDRESS}`);
  });
});
