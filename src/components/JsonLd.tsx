import { serializeJsonLd } from "@/lib/seo";

/** Renders a JSON-LD structured data block. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
