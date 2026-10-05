import { ogImage } from "@/lib/og";

export const alt = "Your questions, answered | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Your questions, answered", subtitle: "Everything you need to know about how Mellox works.", eyebrow: "FAQ" });
}
