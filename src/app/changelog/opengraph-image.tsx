import { ogImage } from "@/lib/og";

export const alt = "What's new in Mellox | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "What's new in Mellox", subtitle: "Product updates, improvements and fixes, newest first.", eyebrow: "Changelog" });
}
