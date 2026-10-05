import type { Metadata } from "next";
import { CalendarCheck, Check } from "lucide-react";
import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { DEMO_FORM, DEMO_INTERESTS } from "@/lib/contact";
import "@/components/pricing/pricing.css";
import "@/components/contact/contact.css";
import "@/components/demo/demo.css";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "See Mellox on your own brand. Book a demo with the team to learn how Brand DNA, AI visibility and publishing work for your agency or company.",
  alternates: { canonical: "/demo" },
};

// optional: a scheduling link (Calendly, Cal.com, HubSpot...) shown as a quick way to pick a time
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL;

const STEPS = [
  { title: "Tell us about your team", text: "Share your website, how many brands you manage and what you want to solve." },
  { title: "We reach out to arrange a time", text: "Someone from the Mellox team replies to your email to find a time that suits you." },
  { title: "See it on your own brand", text: "We walk through Mellox using your website, then talk through the plan that fits." },
];

const SEE = [
  "A Brand DNA built from your own website",
  "How AI assistants describe your brand, and the fixes that follow",
  "Content planning, approvals and native publishing",
  "Agency Mode: client workspaces, portals and pooled credits",
  "Pricing and the plan that fits your roster",
];

// ?interest=scale (or agency, startup, in-house) preselects the form
const INTEREST_MAP: Record<string, string> = {
  scale: DEMO_INTERESTS[3],
  agency: DEMO_INTERESTS[0],
  startup: DEMO_INTERESTS[1],
  "in-house": DEMO_INTERESTS[2],
};

export default async function DemoPage({ searchParams }: { searchParams: Promise<{ interest?: string }> }) {
  const { interest } = await searchParams;
  const defaults = { interest: INTEREST_MAP[(interest ?? "").toLowerCase()] ?? "" };

  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-14 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <CalendarCheck size={26} strokeWidth={1.4} aria-hidden="true" />
            Book a demo
          </p>
          <h1 className="dm-h1">See Mellox working on your brand.</h1>
          <p className="lede">
            Talk to the team, see it run on your own website, and find out which plan fits. Built for agencies and
            teams with more than one brand to look after.
          </p>
          {BOOKING_URL && (
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="px-cta px-cta-lime dm-book">
              Pick a time now
            </a>
          )}
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner dm-grid">
            <div className="dm-left">
              <div data-reveal>
                <p className="px-label">What happens next</p>
                <div className="px-rule" />
                <ol className="dm-steps">
                  {STEPS.map((s, i) => (
                    <li key={s.title}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="px-card dm-see" data-reveal>
                <h3>What we will show you</h3>
                <ul>
                  {SEE.map((t) => (
                    <li key={t}>
                      <Check size={18} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="dm-alt" data-reveal>
                Prefer to look around first? <a href="https://app.mellox.ai">Start free</a>, no credit card required, or
                read the <Link href="/docs">docs</Link> and <Link href="/pricing">pricing</Link>.
              </p>
            </div>

            <div className="dm-form">
              <ContactForm config={DEMO_FORM} id="demo-form" defaults={defaults} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
