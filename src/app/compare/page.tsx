import type { Metadata } from "next";
import { Scale } from "lucide-react";
import DemoCta from "@/components/demo/DemoCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import CompareCoverage from "@/components/compare/CompareCoverage";
import CompareHeadToHead from "@/components/compare/CompareHeadToHead";
import CompareLandscape from "@/components/compare/CompareLandscape";
import CompareMatrix from "@/components/compare/CompareMatrix";
import CompareWins from "@/components/compare/CompareWins";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { ALL_COMPETITORS, CAPS, CATEGORIES, COMPARE_FAQS } from "@/lib/compare";
import "@/components/pricing/pricing.css";
import "@/components/compare/compare.css";

export const metadata: Metadata = {
  title: "Compare Mellox AI with Pomelli, Profound, Jasper and more",
  description:
    "An honest, feature by feature comparison of Mellox AI with 15 other AI marketing platforms across brand memory, content generation, AEO and GEO monitoring and agency mode.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COMPARE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ComparePage() {
  const platformCount = ALL_COMPETITORS.length + 1;

  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-28 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <Scale size={26} strokeWidth={1.4} aria-hidden="true" />
            Compare
          </p>
          <h1 className="cx-h1">Where Mellox AI wins, and where it does not</h1>
          <p className="lede">
            Every AI marketing tool claims to do everything. Here is the specific, checkable version: {platformCount}{" "}
            platforms, {CAPS.length} capabilities, scored honestly.
          </p>
          <div className="cx-stats">
            <div className="cx-stat">
              <b>{platformCount}</b>
              <span>platforms</span>
            </div>
            <div className="cx-stat">
              <b>{CAPS.length}</b>
              <span>capabilities</span>
            </div>
            <div className="cx-stat">
              <b>{CATEGORIES.length}</b>
              <span>categories</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <CompareLandscape />
        <CompareCoverage />
        <CompareMatrix />
        <CompareHeadToHead />
        <CompareWins />

        <section className="px-section">
          <div className="px-inner">
            <div className="px-card cx-verdict" data-reveal>
              <div className="k">The one-line version</div>
              <p>
                Nobody else under <b>$100 a month</b> bundles brand memory content generation with AEO and GEO
                monitoring in one loop.
              </p>
              <p style={{ marginTop: 18, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "#8b97c2", maxWidth: "62ch" }}>
                Mellox does not win by out-featuring the specialists. It closes the gap between a free generation tool
                and a visibility-only tool that neither side is built to serve.
              </p>
            </div>
          </div>
        </section>

        <DemoCta
          title="See how it compares on your own brand."
          text="Book a demo and we will run Mellox against the tools you use today, using your website and your goals."
        />

        <Faq
          items={COMPARE_FAQS}
          title="Comparison questions, answered."
          blurb="How we scored the platforms and what the table does and does not tell you."
        />
      </main>

      <Footer />
    </div>
  );
}
