import { ogImage } from "@/lib/og";

export const alt = "See Mellox working on your brand | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "See Mellox working on your brand", subtitle: "Book a demo with the team.", eyebrow: "Book a demo" });
}
