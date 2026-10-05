import { ogImage } from "@/lib/og";

export const alt = "Partner with Mellox | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Partner with Mellox", subtitle: "Integrations, agencies, resellers and co-marketing.", eyebrow: "Partnerships" });
}
