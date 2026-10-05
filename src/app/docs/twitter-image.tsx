import { ogImage } from "@/lib/og";

export const alt = "Docs and FAQ | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Docs and FAQ", subtitle: "Guides for Brand DNA, audits, publishing and agencies.", eyebrow: "Docs" });
}
