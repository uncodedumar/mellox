import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import type { TermsSection } from "@/lib/terms";
import "@/components/pricing/pricing.css";
import "./legal.css";

/** Shared layout for legal documents: aurora hero, sticky contents list, numbered sections. */
export default function LegalPage({
  icon,
  pill,
  title,
  updated,
  intro,
  sections,
}: {
  icon: ReactNode;
  pill: string;
  title: string;
  updated: string;
  intro: ReactNode;
  sections: TermsSection[];
}) {
  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <PricingReveal />

      <header className="px-hero lg-hero relative flex flex-col items-center px-5 pb-16 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            {icon}
            {pill}
          </p>
          <h1 className="lg-h1">{title}</h1>
          <p className="lede">Last updated {updated}.</p>
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner lg-wrap">
            <aside className="lg-toc" data-lenis-prevent aria-label="On this page">
              <p>On this page</p>
              <ol>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </aside>

            <article className="px-card lg-doc" data-reveal>
              <p className="lg-intro">{intro}</p>
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="lg-sec">
                  <h2>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  {s.paras?.map((p) => <p key={p}>{p}</p>)}
                  {s.list && (
                    <ul>
                      {s.list.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                  {s.after && <p>{s.after}</p>}
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
