import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Faq from "@/components/Faq";
import ContactPaths from "@/components/contact/ContactPaths";
import { CONTACT_FAQS, SUPPORT_FORM } from "@/lib/contact";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import "@/components/pricing/pricing.css";
import "@/components/contact/contact.css";

export const metadata: Metadata = {
  title: "Contact and support",
  description: "Talk to a human, or just send us a message. Reach the Mellox team for support, billing, agency onboarding and Scale plan pricing.",
  alternates: { canonical: "/contact" },
};

const CHANNELS = [
  { t: "Email support", d: "Starter gets email support, Growth gets 24 hour replies, Agency gets priority support and an onboarding call.", a: "support@mellox.ai", h: "mailto:support@mellox.ai" },
  { t: "Scale and volume pricing", d: "Networks and large teams get a dedicated success manager and pricing built around the roster.", a: "Talk to us", h: "mailto:support@mellox.ai?subject=Mellox%20Scale%20plan" },
  { t: "Look it up first", d: "Guides and quick answers on audits, approvals, clients and billing.", a: "Docs and FAQ", h: "/docs" },
];

export default function ContactPage() {
  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <PricingReveal />
      <header className="px-hero relative flex flex-col items-center px-5 pb-20 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <MessageCircle size={26} strokeWidth={1.4} aria-hidden="true" />
            Contact and support
          </p>
          <h1 className="ct-h1">Talk to a human, or just send us a message.</h1>
          <p className="lede">Questions about plans, billing or getting set up? The Mellox team reads every message.</p>
        </div>
      </header>
      <main>
        <ContactPaths />
        <section id="contact" className="px-section">
          <div className="px-inner ct-grid">
            <ContactForm config={SUPPORT_FORM} />
            <aside className="px-card ct-side" data-reveal style={{ transitionDelay: "90ms" }}>
              <h3>Other ways to reach us</h3>
              {CHANNELS.map((c) => (
                <div key={c.t} className="ct-ch">
                  <b>{c.t}</b>
                  <span>{c.d}</span>
                  <span><a href={c.h}>{c.a}</a></span>
                </div>
              ))}
            </aside>
          </div>
        </section>
        <Faq
          items={CONTACT_FAQS}
          title="Contact questions, answered."
          blurb="Who to reach, how fast we reply and where to start."
        />
      </main>
      <Footer />
    </div>
  );
}
