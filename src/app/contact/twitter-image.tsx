import { ogImage } from "@/lib/og";

export const alt = "Contact and support | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Contact and support", subtitle: "Talk to a human, or just send us a message.", eyebrow: "Contact" });
}
