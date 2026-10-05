import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

/** Shared 1200x630 social card used by every route's opengraph-image / twitter-image file. */
export const OG_SIZE = { width: 1200, height: 630 };

let markUri: string | undefined;
function mark() {
  if (!markUri) {
    const svg = readFileSync(path.join(process.cwd(), "public", "brand", "mark-lime.svg"));
    markUri = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  }
  return markUri;
}

export function ogImage({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  const long = title.length > 38;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#fff",
          background:
            "radial-gradient(60% 70% at 8% 105%, rgba(254,112,50,0.5), transparent 70%), radial-gradient(60% 70% at 96% 100%, rgba(7,86,231,0.6), transparent 70%), radial-gradient(45% 55% at 50% 112%, rgba(203,233,96,0.4), transparent 70%), #05070a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark()} width={72} height={38} alt="" />
          <div style={{ display: "flex", fontSize: 34, letterSpacing: 4, color: "#fff" }}>MELLOX</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {eyebrow && (
            <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, color: "#cbe960", textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          )}
          <div style={{ display: "flex", fontSize: long ? 64 : 82, lineHeight: 1.05, letterSpacing: -2, fontWeight: 700 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontSize: 31, lineHeight: 1.35, color: "rgba(255,255,255,0.7)", maxWidth: 940 }}>
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.55)" }}>mellox.ai</div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
