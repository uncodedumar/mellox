import { FEATURE_BY_SLUG, type FeatureSlug } from "@/lib/features";
import { ogImage } from "@/lib/og";

export const alt = "Mellox AI product";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = FEATURE_BY_SLUG[slug as FeatureSlug];
  return ogImage({
    title: f ? `${f.headline[0]} ${f.headline[1]}` : "Mellox AI",
    subtitle: f?.lede,
    eyebrow: f?.name ?? "Product",
  });
}
