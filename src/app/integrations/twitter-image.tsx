import { ogImage } from "@/lib/og";

export const alt = "Connect the channels that matter | Mellox AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ title: "Connect the channels that matter", subtitle: "Google, Meta and every social platform your audience uses.", eyebrow: "Integrations" });
}
