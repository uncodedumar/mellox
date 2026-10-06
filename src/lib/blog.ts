import { promises as fs } from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

/**
 * Blog posts are .mdx files in src/content/blog. The file name is the url slug:
 * `src/content/blog/my-post.mdx` -> /blog/my-post. Files starting with "_" are ignored (use them as drafts/templates).
 * Each file starts with `export const meta = { ... }` (see PostMeta) and then contains free-form markdown + blocks.
 */
export type PostMeta = {
  title: string;
  description: string;
  /** ISO date, e.g. "2026-10-05" */
  date: string;
  author?: string;
  authorRole?: string;
  tags?: string[];
  /** Cover image path, e.g. "/blog/my-post/cover.webp". Optional: a brand gradient is used when missing. */
  cover?: string;
  coverAlt?: string;
  /** Photographer credit shown under the cover, e.g. { name: "Jane Doe", href: "https://unsplash.com/@jane" } */
  coverCredit?: { name: string; href: string };
  /** Hide from the blog index and sitemap (page still opens by url). */
  unlisted?: boolean;
};

export type Post = PostMeta & { slug: string; minutes: number };

const DIR = path.join(process.cwd(), "src", "content", "blog");

async function slugs(): Promise<string[]> {
  const files = await fs.readdir(DIR);
  return files
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export async function getSlugs() {
  return slugs();
}

function readingMinutes(raw: string) {
  const text = raw
    .replace(/export const meta[\s\S]*?\n};?\n/, " ") // frontmatter object
    .replace(/<[^>]+>/g, " ") // jsx tags
    .replace(/[#*_`>\[\]()!-]/g, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 215));
}

export async function getPost(slug: string): Promise<{ post: Post; Content: ComponentType } | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  try {
    const [mod, raw] = await Promise.all([
      import(`@/content/blog/${slug}.mdx`) as Promise<{ default: ComponentType; meta: PostMeta }>,
      fs.readFile(path.join(DIR, `${slug}.mdx`), "utf8"),
    ]);
    return { post: { ...mod.meta, slug, minutes: readingMinutes(raw) }, Content: mod.default };
  } catch {
    return null;
  }
}

/** All listed posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const all = await Promise.all((await slugs()).map((s) => getPost(s)));
  return all
    .filter((p): p is NonNullable<typeof p> => !!p)
    .map((p) => p.post)
    .filter((p) => !p.unlisted)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
