import { ogImage } from "@/lib/og";

export const alt = "Terms of Service | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Terms of Service", subtitle: "The terms that apply when you use Mellox.", eyebrow: "Legal" });
}
