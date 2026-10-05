import type { Metadata } from "next";
import { Banknote } from "lucide-react";
import DemoCta from "@/components/demo/DemoCta";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingMatrix from "@/components/pricing/PricingMatrix";
import PricingMenu from "@/components/pricing/PricingMenu";
import PricingPlans from "@/components/pricing/PricingPlans";
import PricingReveal from "@/components/pricing/PricingReveal";
import PricingTopups from "@/components/pricing/PricingTopups";
import PricingTry from "@/components/pricing/PricingTry";
import { PRICING_FAQS } from "@/lib/pricing";
import "@/components/pricing/pricing.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans, credits you control. Every Mellox plan includes all four marketing brains. Start free, upgrade when you are ready to publish.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function PricingPage() {
  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PricingReveal />

      {/* Hero */}
      <header className="px-hero relative flex flex-col items-center px-5 pb-28 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <Banknote size={26} strokeWidth={1.4} aria-hidden="true" />
            Pricing
          </p>
          <h1>
            Flexible Plans for Every Team
          </h1>
          <p className="lede">
            From solo founders to global agencies, Mellox gives you an AI marketing team that plans, creates,
            publishes and gets your brand cited by AI.
          </p>
        </div>
      </header>

      <main>
        <PricingPlans />
        <PricingTry />
        <PricingTopups />
        <PricingMenu />
        <PricingMatrix />
        <DemoCta
          title="Not sure which plan fits?"
          text="Book a demo and we will look at your roster, show Mellox on your own website and recommend a plan. Agencies and larger teams can talk to us about volume pricing."
          interest="agency"
        />
        <Faq
          items={PRICING_FAQS}
          title="Pricing questions, answered."
          blurb="Find out what AI says about your brand today. Start free, no card needed."
        />
      </main>

      <Footer />
    </div>
  );
}
