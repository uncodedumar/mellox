import { ogImage } from "@/lib/og";

export const alt = "Press and media | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Press and media", subtitle: "Interviews, features, data and product demos.", eyebrow: "Press" });
}
