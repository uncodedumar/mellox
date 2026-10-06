import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Lightweight blog index that reads each post's `meta` block as text, without compiling the MDX.
 * Used where only titles, dates and descriptions are needed (llms.txt) and in tests.
 */
export type PostIndexEntry = { slug: string; title: string; description: string; date: string; unlisted: boolean };

const DIR = path.join(process.cwd(), "src", "content", "blog");

const field = (body: string, key: string) => body.match(new RegExp(`\\b${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`))?.[1]?.replace(/\\"/g, '"') ?? "";

export async function getPostIndex(): Promise<PostIndexEntry[]> {
  const files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));
  const entries = await Promise.all(
    files.map(async (f) => {
      const src = await fs.readFile(path.join(DIR, f), "utf8");
      const body = src.match(/export const meta = \{([\s\S]*?)\n\};/)?.[1] ?? "";
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: field(body, "title"),
        description: field(body, "description"),
        date: field(body, "date"),
        unlisted: /unlisted:\s*true/.test(body),
      };
    }),
  );
  return entries.filter((e) => e.title && !e.unlisted).sort((a, b) => b.date.localeCompare(a.date));
}
