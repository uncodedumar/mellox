import type { Metadata } from "next";
import { Compass } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import "@/components/pricing/pricing.css";
import "@/components/legal/not-found.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/pricing", label: "Pricing", hint: "Plans and credits" },
  { href: "/compare", label: "Compare", hint: "How Mellox stacks up" },
  { href: "/docs", label: "Docs and FAQ", hint: "Guides and answers" },
  { href: "/contact", label: "Contact", hint: "Talk to the team" },
];

export default function NotFound() {
  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <header className="px-hero nf-hero relative flex flex-col items-center px-5 pb-16 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="px-hero-pill">
            <Compass size={26} strokeWidth={1.4} aria-hidden="true" />
            Error 404
          </p>
          <h1 className="nf-h1">
            This page <span className="hero-headline-accent">got lost</span>
          </h1>
          <p className="lede">
            The page you are looking for does not exist, or it has moved. Let&apos;s get you back on track.
          </p>
          <div className="nf-actions">
            <Link href="/" className="px-cta px-cta-lime">
              Back to home
            </Link>
            <Link href="/contact" className="px-cta hero-cta">
              Contact support
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner">
            <ul className="nf-links">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="px-card nf-link">
                    <b>{l.label}</b>
                    <span>{l.hint}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
