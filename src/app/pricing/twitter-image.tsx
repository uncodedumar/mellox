import { ogImage } from "@/lib/og";

export const alt = "Flexible plans for every team | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Flexible plans for every team", subtitle: "From solo founders to global agencies.", eyebrow: "Pricing" });
}
