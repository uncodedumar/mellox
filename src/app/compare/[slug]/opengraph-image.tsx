import { RIVAL_BY_SLUG } from "@/lib/compare-pages";
import { ogImage } from "@/lib/og";

export const alt = "Mellox AI comparison";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = RIVAL_BY_SLUG[slug];
  return ogImage({
    title: r ? `Mellox AI vs ${r.platform.name}` : "Compare Mellox AI",
    subtitle: r ? `An honest, capability-by-capability comparison and ${r.platform.name} alternative.` : undefined,
    eyebrow: "Compare",
  });
}
