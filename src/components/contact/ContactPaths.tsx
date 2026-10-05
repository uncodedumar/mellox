import { Handshake, Newspaper } from "lucide-react";
import Link from "next/link";
import HelloTypewriter from "./HelloTypewriter";

export default function ContactPaths() {
  return (
    <section className="px-section" style={{ paddingTop: 0 }}>
      <div className="px-inner ct-paths">
        <article className="px-card ct-expert" data-reveal>
          <div className="ct-hello" aria-hidden="true">
            <HelloTypewriter />
          </div>
          <h3>Connect with Expert Team</h3>
          <p>
            Get personalized guidance and see how Mellox can run your brand&apos;s marketing and AI visibility. Our
            experts will help you explore the right plan.
          </p>
          <a href="#contact" className="px-cta hero-cta">
            Get Help
          </a>
        </article>
        <article className="px-card ct-path" data-reveal style={{ transitionDelay: "90ms" }}>
          <span className="ct-ico">
            <Newspaper size={34} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <h3>Press and Media Inquiries</h3>
          <p>For interviews, articles, and media requests.</p>
          <Link href="/contact/press" className="px-cta hero-cta">
            Write to us
          </Link>
        </article>
        <article className="px-card ct-path" data-reveal style={{ transitionDelay: "180ms" }}>
          <span className="ct-ico">
            <Handshake size={34} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <h3>Partner and Collaboration</h3>
          <p>Explore collaboration and integration opportunities.</p>
          <Link href="/contact/partner" className="px-cta hero-cta">
            Let&apos;s Connect
          </Link>
        </article>
      </div>
    </section>
  );
}
