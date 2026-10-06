import type { ReactNode } from "react";
import Link from "next/link";
import "./cta-band.css";

type CtaLink = { label: string; href: string };

function CtaButton({ link, variant }: { link: CtaLink; variant: "primary" | "secondary" }) {
  const className = `px-cta ${variant === "primary" ? "px-cta-lime" : "hero-cta"}`;
  // internal routes use client-side navigation; app, mailto and other links stay plain anchors
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

/**
 * The one call-to-action band used site wide. Copy sits on the left, buttons on the right and both are
 * vertically centred; on tablets and phones it stacks and the buttons align with the text.
 */
export default function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: ReactNode;
  text: ReactNode;
  primary: CtaLink;
  secondary?: CtaLink;
}) {
  return (
    <section className="px-section">
      <div className="px-inner">
        <div className="px-card cta-band" data-reveal>
          <div className="cta-copy">
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-actions">
            <CtaButton link={primary} variant="primary" />
            {secondary && <CtaButton link={secondary} variant="secondary" />}
          </div>
        </div>
      </div>
    </section>
  );
}
