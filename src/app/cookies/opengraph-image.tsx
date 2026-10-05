import { ogImage } from "@/lib/og";

export const alt = "Cookie Policy | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Cookie Policy", subtitle: "Which cookies we use and how to change your choices.", eyebrow: "Legal" });
}
