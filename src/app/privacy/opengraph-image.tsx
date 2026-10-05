import { ogImage } from "@/lib/og";

export const alt = "Privacy Policy | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Privacy Policy", subtitle: "How Mellox handles your information.", eyebrow: "Legal" });
}
