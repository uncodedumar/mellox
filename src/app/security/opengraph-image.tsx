import { ogImage } from "@/lib/og";

export const alt = "Security and trust | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Security and trust", subtitle: "What stays private, what you control, and who to ask.", eyebrow: "Trust" });
}
