import { ogImage } from "@/lib/og";

export const alt = "About Mellox | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "About Mellox", subtitle: "The AI marketing platform built to get brands recommended.", eyebrow: "About" });
}
