import { ogImage } from "@/lib/og";
import { USE_CASE_BY_SLUG, type UseCaseSlug } from "@/lib/use-cases";

export const alt = "Mellox AI use case";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const u = USE_CASE_BY_SLUG[slug as UseCaseSlug];
  return ogImage({
    title: u ? `${u.headline[0]} ${u.headline[1]}` : "Mellox AI",
    subtitle: u?.lede,
    eyebrow: u ? `For ${u.name.toLowerCase()}` : "Use cases",
  });
}
