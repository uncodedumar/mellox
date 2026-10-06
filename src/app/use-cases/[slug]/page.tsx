import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FeatureVisual from "@/components/features/FeatureVisual";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import UseCaseStory from "@/components/use-cases/UseCaseStory";
import { FEATURE_BY_SLUG } from "@/lib/features";
import { PLANS } from "@/lib/pricing";
import { USE_CASES, USE_CASE_BY_SLUG, type UseCaseSlug } from "@/lib/use-cases";
import "@/components/pricing/pricing.css";
import "@/components/features/features.css";
import "@/components/use-cases/use-cases.css";
import CtaBand from "@/components/cta/CtaBand";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return USE_CASES.map((u) => ({ slug: u.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const u = USE_CASE_BY_SLUG[slug as UseCaseSlug];
  if (!u) return {};
  return {
    title: `Mellox for ${u.name}`,
    description: u.metaDescription,
    alternates: { canonical: `/use-cases/${u.slug}` },
    openGraph: { title: `Mellox for ${u.name} | Mellox AI`, description: u.metaDescription },
  };
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const u = USE_CASE_BY_SLUG[slug as UseCaseSlug];
  if (!u) notFound();
  const Icon = u.icon;
  const plans = u.plans.map((id) => PLANS.find((p) => p.id === id)!).filter(Boolean);
  const others = USE_CASES.filter((x) => x.slug !== u.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: u.faqs.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <div className="px ft relative flex min-h-screen flex-col overflow-x-clip" style={{ ["--accent" as string]: u.accent }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-10 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
            For {u.name.toLowerCase()}
          </p>
          <h1 className="ft-h1">
            {u.headline[0]}
            <br />
            {u.headline[1]}
          </h1>
          <p className="lede">{u.lede}</p>
          <div className="ft-actions">
            <a href="https://app.mellox.ai" className="px-cta px-cta-lime">
              Start free
            </a>
            <Link href="/pricing" className="ft-ghost">
              See pricing
            </Link>
          </div>
          <p className="ft-note">No credit card required.</p>
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner">
            <div className="ft-stage" data-reveal>
              <FeatureVisual slug={u.visual} />
            </div>
          </div>
        </section>

        {/* the problem */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Sound familiar?</p>
            <div className="px-rule" />
            <ol className="ft-steps">
              {u.pains.map((p, i) => (
                <li key={p.title} className="px-card ft-step" data-reveal>
                  <span className="ft-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* how Mellox helps (links to the product pages) */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">How Mellox helps</p>
            <div className="px-rule" />
            <div className="ft-head" data-reveal>
              <h2>Built for {u.name.toLowerCase()}.</h2>
              <p>{u.hint}.</p>
            </div>
            <div className="uc-help">
              {u.help.map((h) => {
                const f = FEATURE_BY_SLUG[h.feature];
                const FIcon = f.icon;
                return (
                  <Link key={h.feature} href={`/features/${h.feature}`} className="uc-help-card" style={{ ["--accent" as string]: f.accent }} data-reveal>
                    <span className="ft-icon">
                      <FIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3>{h.title}</h3>
                    <p>{h.text}</p>
                    <span className="uc-link">
                      {f.name} <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <UseCaseStory story={u.story} />

        {/* plan fit */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">The right plan</p>
            <div className="px-rule" />
            <div className="uc-plans" data-reveal>
              {plans.map((p) => (
                <div key={p.id} className="px-card uc-plan">
                  <div className="uc-plan-top">
                    <h3>{p.name}</h3>
                    <p className="uc-price">
                      {p.monthly ? `$${p.monthly}` : "Custom"}
                      {p.monthly ? <small> /mo</small> : null}
                    </p>
                  </div>
                  <p className="uc-tag">{p.tagline}</p>
                  <div className="ft-chips">
                    {p.chips.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                    <span>{p.credits}</span>
                  </div>
                  <ul className="uc-feats">
                    {p.features.slice(0, 5).map((f) => (
                      <li key={f}>
                        <Check size={16} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="https://app.mellox.ai" className="px-cta px-cta-lime">
                    {p.cta}
                  </a>
                </div>
              ))}
              <div className="uc-plan-side">
                <p>{u.planNote}</p>
                <Link href="/pricing">Compare all plans</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Questions</p>
            <div className="px-rule" />
            <div className="ft-faq">
              {u.faqs.map((q) => (
                <details key={q.q} className="ft-q" data-reveal>
                  <summary>{q.q}</summary>
                  <p>{q.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Other teams</p>
            <div className="px-rule" />
            <div className="ft-more uc-others">
              {others.map((o) => {
                const OIcon = o.icon;
                return (
                  <Link key={o.slug} href={`/use-cases/${o.slug}`} className="ft-more-card" style={{ ["--accent" as string]: o.accent }} data-reveal>
                    <span className="ft-icon">
                      <OIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3>Mellox for {o.name.toLowerCase()}</h3>
                    <p>{o.hint}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBand
          title={<>See Mellox working for {u.name.toLowerCase()}.</>}
          text="Start free. No credit card required."
          primary={{ label: "Get started", href: "https://app.mellox.ai" }}
        />
      </main>

      <Footer />
    </div>
  );
}
