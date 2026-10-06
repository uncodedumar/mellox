import type { Metadata } from "next";
import { History } from "lucide-react";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { formatDate } from "@/lib/blog";
import { CHANGE_LABEL, RELEASES, type ChangeType } from "@/lib/changelog";
import "@/components/pricing/pricing.css";
import "@/components/changelog/changelog.css";
import CtaBand from "@/components/cta/CtaBand";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Everything new in Mellox: product updates, improvements and fixes, newest first.",
  alternates: { canonical: "/changelog" },
};

const ORDER: ChangeType[] = ["new", "improved", "fixed"];

export default function ChangelogPage() {
  const releases = [...RELEASES].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-16 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <History size={26} strokeWidth={1.4} aria-hidden="true" />
            Changelog
          </p>
          <h1 className="cl-h1">What&apos;s new in Mellox</h1>
          <p className="lede">Product updates, improvements and fixes, newest first.</p>
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner">
            <ol className="cl-list">
              {releases.map((r) => {
                const groups = ORDER.map((type) => ({ type, items: r.changes.filter((c) => c.type === type) })).filter(
                  (g) => g.items.length > 0,
                );
                return (
                  <li key={r.date} id={r.date} className="cl-item" data-reveal>
                    <div className="cl-when">
                      <time dateTime={r.date}>{formatDate(r.date)}</time>
                      {r.version && <span>{r.version}</span>}
                    </div>

                    <article className="px-card cl-card">
                      <h2>{r.title}</h2>
                      {r.summary && <p className="cl-summary">{r.summary}</p>}
                      {r.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="cl-image" src={r.image} alt={r.imageAlt ?? ""} loading="lazy" decoding="async" />
                      )}
                      {groups.map((g) => (
                        <div key={g.type} className="cl-group">
                          <span className={`cl-badge cl-${g.type}`}>{CHANGE_LABEL[g.type]}</span>
                          <ul>
                            {g.items.map((c) => (
                              <li key={c.text}>{c.text}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        <CtaBand
          title="Got an idea or found a bug?"
          text="We read every message and ship fixes and ideas often. Tell us what would make Mellox better."
          primary={{ label: "Contact us", href: "/contact" }}
        />
      </main>

      <Footer />
    </div>
  );
}
