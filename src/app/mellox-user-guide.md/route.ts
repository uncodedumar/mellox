import { readFileSync } from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

/**
 * /mellox-user-guide.md: the complete "how to use Mellox" guide, written for AI assistants. It is deliberately not a
 * page: nothing on the website links to it and it is not in the sitemap. It is announced in /llms.txt and
 * /llms-full.txt so an assistant that is helping a stuck Mellox user can find it. The source is content/user-guide.md.
 */
export async function GET() {
  const body = readFileSync(path.join(process.cwd(), "content", "user-guide.md"), "utf8");
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
