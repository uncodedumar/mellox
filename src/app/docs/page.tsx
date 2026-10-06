import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import DocsExplorer from "@/components/docs/DocsExplorer";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { DOC_FAQS } from "@/lib/docs";
import "@/components/pricing/pricing.css";
import CtaBand from "@/components/cta/CtaBand";

export const metadata: Metadata = {
  title: "Docs and FAQ",
  description:
    "Guides and answers for setting up Brand DNA, running GEO and AEO audits, publishing content and managing agency clients in Mellox.",
  alternates: { canonical: "/docs" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: DOC_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function DocsPage() {
  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-20 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <BookOpen size={26} strokeWidth={1.4} aria-hidden="true" />
            Docs and FAQ
          </p>
          <h1 className="dx-h1">How to get the most out of Mellox</h1>
          <p className="lede">Guides for setting up your brand, running audits, and managing clients.</p>
        </div>
      </header>

      <main>
        <DocsExplorer />

        <CtaBand
          title="Still stuck? We are one message away."
          text="Email the team and a human will get back to you. Paid plans get faster replies."
          primary={{ label: "Contact support", href: "mailto:support@mellox.ai" }}
          secondary={{ label: "Contact page", href: "/contact" }}
        />
      </main>

      <Footer />
    </div>
  );
}
