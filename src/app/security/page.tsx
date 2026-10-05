import type { Metadata } from "next";
import { Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { CONTROL, DOCS, ENTERPRISE, FAQS, PROTECT, type TrustItem } from "@/lib/security";
import "@/components/pricing/pricing.css";
import "@/components/features/features.css";
import "@/components/security/security.css";

export const metadata: Metadata = {
  title: "Security and trust",
  description:
    "How Mellox keeps your brand data private, what you control, how approvals work, and where to ask your security questions.",
  alternates: { canonical: "/security" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

function Cards({ items }: { items: TrustItem[] }) {
  return (
    <div className="ft-grid">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.title} className="ft-item" data-reveal>
            <span className="ft-icon">
              <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
            </span>
            <h3>{it.title}</h3>
            <p>{it.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function SecurityPage() {
  return (
    <div className="px ft relative flex min-h-screen flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-14 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <ShieldCheck size={26} strokeWidth={1.4} aria-hidden="true" />
            Security and trust
          </p>
          <h1 className="ft-h1">Your brand data, in your hands.</h1>
          <p className="lede">
            What stays private, what you control, and how to reach us with security questions. Plain language, no
            marketing fog.
          </p>
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner">
            <p className="px-label">What you control</p>
            <div className="px-rule" />
            <div className="ft-head" data-reveal>
              <h2>You decide who sees what, and what goes live.</h2>
              <p>The controls built into every workspace.</p>
            </div>
            <Cards items={CONTROL} />
          </div>
        </section>

        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">How we protect data</p>
            <div className="px-rule" />
            <div className="ft-head" data-reveal>
              <h2>How we handle your information.</h2>
              <p>
                The measures below are the ones described in our <Link href="/privacy#security">Privacy Policy</Link>.
              </p>
            </div>
            <Cards items={PROTECT} />
            <p className="sc-note" data-reveal>
              No system is perfectly secure, so we do not promise the impossible. If you suspect a problem with your
              account, tell us straight away at <a href="mailto:support@mellox.ai">support@mellox.ai</a>.
            </p>
          </div>
        </section>

        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">For larger teams</p>
            <div className="px-rule" />
            <div className="px-card sc-ent" data-reveal>
              <div>
                <h2>Bigger roster, more controls.</h2>
                <ul>
                  {ENTERPRISE.map((e) => (
                    <li key={e}>
                      <Check size={18} aria-hidden="true" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="px-cta px-cta-lime">
                Talk to us
              </Link>
            </div>
            <p className="sc-note" data-reveal>
              This page does not list third-party certifications or audit reports. If your security team needs a
              questionnaire answered, or details such as hosting and subprocessors, email{" "}
              <a href="mailto:support@mellox.ai">support@mellox.ai</a> and tell us what you need.
            </p>
          </div>
        </section>

        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Read the details</p>
            <div className="px-rule" />
            <div className="sc-docs">
              {DOCS.map((d) => (
                <Link key={d.href} href={d.href} className="ft-more-card" data-reveal>
                  <h3>{d.label}</h3>
                  <p>{d.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Questions</p>
            <div className="px-rule" />
            <div className="ft-faq">
              {FAQS.map((q) => (
                <details key={q.q} className="ft-q" data-reveal>
                  <summary>{q.q}</summary>
                  <p>{q.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
