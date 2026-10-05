import { ogImage } from "@/lib/og";

export const alt = "Where Mellox wins, and where it does not | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Where Mellox wins, and where it does not", subtitle: "An honest comparison of AI marketing platforms.", eyebrow: "Compare" });
}
