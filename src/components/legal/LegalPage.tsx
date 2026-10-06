import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import Rich from "./Rich";
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
              <div className="lg-intro">{intro}</div>
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="lg-sec">
                  <h2>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  {s.paras?.map((p) => (
                    <p key={p}>
                      <Rich text={p} />
                    </p>
                  ))}
                  {s.list && (
                    <ul>
                      {s.list.map((l) => (
                        <li key={l}>
                          <Rich text={l} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.after && (
                    <p>
                      <Rich text={s.after} />
                    </p>
                  )}
                  {s.blocks?.map((b, j) => {
                    if ("h" in b) return <h3 key={j}>{b.h}</h3>;
                    if ("p" in b)
                      return (
                        <p key={j}>
                          <Rich text={b.p} />
                        </p>
                      );
                    const items = "ul" in b ? b.ul : b.ol;
                    const List = "ul" in b ? "ul" : "ol";
                    return (
                      <List key={j}>
                        {items.map((l, k) => (
                          <li key={k}>
                            <Rich text={l} />
                          </li>
                        ))}
                      </List>
                    );
                  })}
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
