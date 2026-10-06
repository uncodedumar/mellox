import type { Metadata } from "next";
import { Plug } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { FAQS, GROUPS, STEPS } from "@/lib/integrations";
import "@/components/pricing/pricing.css";
import "@/components/features/features.css";
import "@/components/integrations/integrations.css";
import CtaBand from "@/components/cta/CtaBand";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Google Analytics and Search Console, Meta, LinkedIn, X, TikTok, YouTube, Pinterest, Reddit, WordPress, Webflow and GitHub to Mellox.",
  alternates: { canonical: "/integrations" },
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

export default function IntegrationsPage() {
  return (
    <div className="px ft relative flex min-h-screen flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-12 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <Plug size={26} strokeWidth={1.4} aria-hidden="true" />
            Integrations
          </p>
          <h1 className="ft-h1">Connect the channels that matter.</h1>
          <p className="lede">Claude and ChatGPT over MCP, Slack, Notion and Canva, plus Google, Meta and every social platform your audience uses, working together in one workspace.</p>
          <div className="ft-actions">
            <a href="https://app.mellox.ai" className="px-cta px-cta-lime">
              Start free
            </a>
            <Link href="/pricing" className="ft-ghost">
              See pricing
            </Link>
          </div>
          <nav className="ig-jump" aria-label="Jump to a group">
            {GROUPS.map((g) => (
              <a key={g.id} href={`#${g.id}`}>
                {g.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner">
            <ol className="ft-steps" style={{ marginTop: 0 }}>
              {STEPS.map((s, i) => (
                <li key={s.title} className="px-card ft-step" data-reveal>
                  <span className="ft-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="px-section ig-group" style={{ ["--accent" as string]: g.accent }}>
            <div className="px-inner">
              <p className="px-label">{g.title}</p>
              <div className="px-rule" />
              <div className="ft-head" data-reveal>
                <h2>{g.title}</h2>
                <p>{g.intro}</p>
              </div>
              <div className="ig-grid">
                {g.items.map((it) => {
                  const Icon = it.icon;
                  return (
                    <div key={`${g.id}-${it.name}`} className="ig-card" data-reveal>
                      <div className="ig-top">
                        <span className="ig-logo">
                          {it.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img className="ig-img" src={it.image} alt="" width={34} height={34} />
                          ) : it.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`/llms/${it.logo}.svg`} alt="" width={28} height={28} />
                          ) : Icon ? (
                            <Icon size={24} strokeWidth={1.6} aria-hidden="true" />
                          ) : null}
                        </span>
                        <span className="ig-plan">{it.plan}</span>
                      </div>
                      <h3>{it.name}</h3>
                      <p>{it.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

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

        <CtaBand
          title="Missing a channel you need?"
          text="Tell us what you would like to connect and we will take a look."
          primary={{ label: "Contact us", href: "/contact" }}
        />
      </main>

      <Footer />
    </div>
  );
}
