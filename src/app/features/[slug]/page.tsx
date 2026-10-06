import type { Metadata } from "next";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import FeatureVisual from "@/components/features/FeatureVisual";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { FEATURES, FEATURE_BY_SLUG, PLAN_COLUMNS, matrixRow, type FeatureSlug } from "@/lib/features";
import "@/components/pricing/pricing.css";
import "@/components/features/features.css";
import CtaBand from "@/components/cta/CtaBand";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FEATURES.map((f) => ({ slug: f.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const f = FEATURE_BY_SLUG[slug as FeatureSlug];
  if (!f) return {};
  return {
    title: `${f.name}: ${f.hint}`,
    description: f.metaDescription,
    alternates: { canonical: `/features/${f.slug}` },
    openGraph: { title: `${f.name} | Mellox AI`, description: f.metaDescription },
  };
}

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check size={18} aria-label="Included" className="ft-yes" />;
  if (v === false) return <Minus size={18} aria-label="Not included" className="ft-no" />;
  return <>{v}</>;
}

export default async function FeaturePage({ params }: Props) {
  const { slug } = await params;
  const f = FEATURE_BY_SLUG[slug as FeatureSlug];
  if (!f) notFound();
  const Icon = f.icon;
  const others = FEATURES.filter((x) => x.slug !== f.slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.faqs.map((q) => ({
      "@type": "Question",
      name: q.q,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  return (
    <div className="px ft relative flex min-h-screen flex-col overflow-x-clip" style={{ ["--accent" as string]: f.accent }}>
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
            {f.name}
          </p>
          <h1 className="ft-h1">
            {f.headline[0]}
            <br />
            {f.headline[1]}
          </h1>
          <p className="lede">{f.lede}</p>
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
        {/* product illustration */}
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner">
            <div className="ft-stage" data-reveal>
              <FeatureVisual slug={f.slug} />
            </div>
          </div>
        </section>

        {/* how it works */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">How it works</p>
            <div className="px-rule" />
            <ol className="ft-steps">
              {f.steps.map((s, i) => (
                <li key={s.title} className="px-card ft-step" data-reveal>
                  <span className="ft-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* capabilities */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">What you get</p>
            <div className="px-rule" />
            <div className="ft-head" data-reveal>
              <h2>{f.itemsTitle}</h2>
              {f.itemsIntro && <p>{f.itemsIntro}</p>}
            </div>
            <div className="ft-grid">
              {f.items.map((it) => {
                const ItemIcon = it.icon;
                return (
                  <div key={it.title} className="ft-item" data-reveal>
                    <span className="ft-icon">
                      {it.img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.img} alt="" width={30} height={30} />
                      ) : (
                        <ItemIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                      )}
                    </span>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* plan table (reads the pricing matrix) */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Plans</p>
            <div className="px-rule" />
            <div className="ft-head" data-reveal>
              <h2>{f.table.title}</h2>
              <p>{f.table.intro}</p>
            </div>
            <div className="ft-table-wrap" data-reveal>
              <table className="ft-table">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Feature</span>
                    </th>
                    {PLAN_COLUMNS.map((c) => (
                      <th key={c.name} scope="col" className={"highlight" in c && c.highlight ? "hl" : undefined}>
                        {c.name}
                        <small>{c.price}</small>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {f.table.rows.map((label) => {
                    const row = matrixRow(label);
                    return (
                      <tr key={label}>
                        <th scope="row">{row.label}</th>
                        {row.values.map((v, i) => (
                          <td key={i} className={PLAN_COLUMNS[i] && "highlight" in PLAN_COLUMNS[i] ? "hl" : undefined}>
                            <Cell v={v} />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="ft-fine">
              Full details on the <Link href="/pricing">pricing page</Link>.
            </p>
          </div>
        </section>

        {/* faq */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Questions</p>
            <div className="px-rule" />
            <div className="ft-faq">
              {f.faqs.map((q) => (
                <details key={q.q} className="ft-q" data-reveal>
                  <summary>{q.q}</summary>
                  <p>{q.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* more features */}
        <section className="px-section">
          <div className="px-inner">
            <p className="px-label">Explore more</p>
            <div className="px-rule" />
            <div className="ft-more">
              {others.map((o) => {
                const OIcon = o.icon;
                return (
                  <Link key={o.slug} href={`/features/${o.slug}`} className="ft-more-card" style={{ ["--accent" as string]: o.accent }} data-reveal>
                    <span className="ft-icon">
                      <OIcon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3>{o.name}</h3>
                    <p>{o.hint}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CtaBand
          title={<>Try {f.name} on your own brand.</>}
          text="Start free. No credit card required."
          primary={{ label: "Get started", href: "https://app.mellox.ai" }}
        />
      </main>

      <Footer />
    </div>
  );
}
