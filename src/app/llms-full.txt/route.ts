import { getPostIndex } from "@/lib/blog-index";
import { buildLlmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

/** /llms-full.txt: the substance of every key page in one Markdown file, for AI assistants. */
export async function GET() {
  const body = buildLlmsFullTxt(await getPostIndex());
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
