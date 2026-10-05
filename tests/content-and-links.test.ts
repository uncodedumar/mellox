import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURES } from "@/lib/features";
import { USE_CASES } from "@/lib/use-cases";

const ROOT = process.cwd();
const APP = path.join(ROOT, "src", "app");
const BLOG = path.join(ROOT, "src", "content", "blog");

const postFiles = readdirSync(BLOG).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

describe("blog posts", () => {
  it("each has a url-safe name and complete metadata", () => {
    expect(postFiles.length).toBeGreaterThan(0);
    for (const f of postFiles) {
      expect(f, f).toMatch(/^[a-z0-9-]+\.mdx$/);
      const src = readFileSync(path.join(BLOG, f), "utf8");
      const meta = src.match(/export const meta = \{([\s\S]*?)\n\};/);
      expect(meta, `${f} needs "export const meta = { ... };"`).not.toBeNull();
      const body = meta![1];
      for (const key of ["title", "description", "date"]) {
        expect(body, `${f} is missing ${key}`).toMatch(new RegExp(`\\b${key}:`));
      }
      expect(body, `${f} date must be YYYY-MM-DD`).toMatch(/date:\s*"\d{4}-\d{2}-\d{2}"/);
    }
  });
});

/** All routes that exist, built from the app folder (static pages) plus the data behind dynamic pages. */
function routes(): Set<string> {
  const found = new Set<string>();
  const walk = (dir: string, prefix: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith("_") || entry.name === "api") continue;
      const next = path.join(dir, entry.name);
      if (entry.name.startsWith("[")) continue; // dynamic, handled below
      const route = `${prefix}/${entry.name}`;
      if (existsSync(path.join(next, "page.tsx"))) found.add(route);
      walk(next, route);
    }
  };
  walk(APP, "");
  found.add("/");
  for (const f of FEATURES) found.add(`/features/${f.slug}`);
  for (const u of USE_CASES) found.add(`/use-cases/${u.slug}`);
  for (const f of postFiles) found.add(`/blog/${f.replace(/\.mdx$/, "")}`);
  return found;
}

describe("navigation links", () => {
  it("never uses a bare in-page anchor as a top-level destination (those are dead on other pages)", () => {
    const files = ["Footer.tsx", "Navbar.tsx"].map((f) => path.join(ROOT, "src", "components", f));
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(/href:\s*"(#[^"]*)"/g)) {
        throw new Error(`${path.basename(file)} has a dead anchor link: ${m[1]}. Use a real page path such as "/pricing".`);
      }
    }
  });

  const known = routes();
  const files = ["Footer.tsx", "Navbar.tsx"].map((f) => path.join(ROOT, "src", "components", f));

  it("every internal link in the navbar and footer points at a real page", () => {
    for (const file of files) {
      const src = readFileSync(file, "utf8");
      for (const m of src.matchAll(/href:\s*"(\/[^"#?]*)"/g)) {
        const href = m[1] === "" ? "/" : m[1];
        expect(known.has(href), `${path.basename(file)} links to ${href}, which has no page`).toBe(true);
      }
    }
  });
});
