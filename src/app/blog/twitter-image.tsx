import { ogImage } from "@/lib/og";

export const alt = "The Mellox blog | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "The Mellox blog", subtitle: "Guides, product news and ideas on AI search and marketing.", eyebrow: "Blog" });
}
