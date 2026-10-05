import type { ReactNode } from "react";

/** Label + hairline + big title with a short blurb on the right (same pattern as the FAQ section). */
export default function SectionHead({
  icon,
  label,
  title,
  blurb,
  wide = false,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  blurb: string;
  wide?: boolean;
}) {
  return (
    <>
      <div className="px-label" data-reveal>
        {icon}
        <span>{label}</span>
      </div>
      <div className="px-rule" data-reveal />
      <div className={`px-head ${wide ? "wide" : ""}`}>
        <h2 data-reveal>{title}</h2>
        <p data-reveal style={{ transitionDelay: "120ms" }}>
          {blurb}
        </p>
      </div>
    </>
  );
}
