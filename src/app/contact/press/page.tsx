import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { PRESS_FORM } from "@/lib/contact";
import "@/components/pricing/pricing.css";
import "@/components/contact/contact.css";

export const metadata: Metadata = {
  title: "Press and media inquiries",
  description: "Interview, article and media requests for the Mellox team.",
  alternates: { canonical: "/contact/press" },
};

export default function PressPage() {
  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <PricingReveal />
      <header className="px-hero relative flex flex-col items-center px-5 pb-20 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <Newspaper size={26} strokeWidth={1.4} aria-hidden="true" />
            Press and media
          </p>
          <h1 className="ct-h1">Press and media inquiries</h1>
          <p className="lede">For interviews, articles, and media requests. Tell us about your story and deadline.</p>
        </div>
      </header>
      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner ct-single">
            <p className="ct-back">
              <Link href="/contact">Back to contact</Link>
            </p>
            <ContactForm config={PRESS_FORM} id="press" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
