import type { Metadata } from "next";
import { Compass, Layers, UserRound, ListChecks, Route, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import SectionHead from "@/components/pricing/SectionHead";
import { AUDIENCES, BRAINS, FOUNDERS, PRINCIPLES, STACK_REPLACED, STATS, STEPS } from "@/lib/about";
import "@/components/pricing/pricing.css";
import "@/components/about/about.css";
import CtaBand from "@/components/cta/CtaBand";
import WhatsNew from "@/components/whats-new/WhatsNew";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mellox is the AI marketing team that learns your brand, creates and publishes on-brand content, and gets you recommended by ChatGPT, Gemini and Perplexity.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-24 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />
        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <Users size={26} strokeWidth={1.4} aria-hidden="true" />
            About
          </p>
          <h1 className="ab-h1">Shaping the Future of AI Marketing</h1>
          <p className="lede">
            The AI marketing team, built so you stop paying for ten tools to do one job.
          </p>
        </div>
      </header>

      <main>
        {/* Mission */}
        <section id="mission" className="px-section">
          <div className="px-inner">
            <SectionHead
              icon={<Compass size={32} strokeWidth={1.4} aria-hidden="true" />}
              label="The problem we exist to fix"
              title="Don't just rank. Be recommended."
              blurb="Search is turning into conversation. We help brands show up in the answer."
              wide
            />
            <div className="ab-mission">
              <article className="px-card" data-reveal>
                <p className="ab-statement">
                  <b>Buyers now ask ChatGPT and Gemini</b> before they ask Google.
                </p>
                <p className="ab-copy">
                  Most brands have no idea what those answers say about them, and no fast way to fix it. At the same
                  time, agencies and founders are stretched across disconnected tools that were never built to talk to
                  each other.
                </p>
                <p className="ab-copy">
                  Mellox is the layer that closes both gaps at once: a system that plans your strategy, writes and
                  ships content in your voice, and actively works to get you cited inside AI answers, not just ranked
                  on a search results page.
                </p>
              </article>
              <article className="px-card ab-stats" data-reveal style={{ transitionDelay: "90ms" }}>
                {STATS.map((s) => (
                  <div key={s.label} className="ab-stat">
                    <b>{s.value}</b>
                    <span>{s.label}</span>
                  </div>
                ))}
              </article>
            </div>

            <div className="px-card ab-stack" data-reveal>
              <div>
                <p className="ab-tag">One workspace, not ten tools</p>
                <h3>Mellox replaces the stack.</h3>
                <p className="body">
                  One workspace that plans, writes, publishes, and makes sure AI engines actually recommend you.
                </p>
              </div>
              <div className="ab-merge" aria-label="Replaces a strategy doc, content tool, scheduler, SEO checker and analytics dashboard">
                <ul>
                  {STACK_REPLACED.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <span className="ab-arrow" aria-hidden="true">→</span>
                <span className="ab-one">Mellox</span>
              </div>
            </div>
          </div>
        </section>

        {/* Founders */}
        <section id="founders" className="px-section">
          <div className="px-inner">
            <SectionHead
              icon={<UserRound size={32} strokeWidth={1.4} aria-hidden="true" />}
              label="The founders"
              title="Meet the people behind Mellox."
              blurb="A founder and a co-founder building the AI marketing team they wanted for their own brands."
              wide
            />
            <div className="ab-founders">
              {FOUNDERS.map((f, i) => (
                <article
                  key={f.name}
                  className="ab-founder"
                  data-reveal
                  style={{ transitionDelay: `${i * 100}ms`, "--accent": f.accent } as React.CSSProperties}
                >
                  <div className="ab-photo">
                    <Image
                      src={f.photo}
                      alt={`${f.name}, ${f.role} of Mellox`}
                      width={800}
                      height={1000}
                      sizes="(max-width: 700px) 90vw, 560px"
                    />
                    <div className="ab-photo-cap">
                      <span className="ab-role">{f.role}</span>
                      <h3>{f.name}</h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Brains */}
        <section id="brains" className="px-section">
          <div className="px-inner">
            <SectionHead
              icon={<Layers size={32} strokeWidth={1.4} aria-hidden="true" />}
              label="How it thinks"
              title="Four brains, working together."
              blurb="Every plan includes all four. Each one has a single job and they share what they learn."
              wide
            />
            <div className="ab-brains">
              {BRAINS.map((b, i) => (
                <article key={b.name} className="px-card" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="ab-brain-ico">
                    <Image src={b.icon} alt="" width={44} height={44} unoptimized />
                  </span>
                  <h3>{b.name}</h3>
                  <p className="ab-tag">{b.tag}</p>
                  <p className="body">{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section id="principles" className="px-section">
          <div className="px-inner">
            <SectionHead
              icon={<ListChecks size={32} strokeWidth={1.4} aria-hidden="true" />}
              label="What we believe"
              title="Principles we build by."
              blurb="The ideas behind the product, and the promises we try to keep."
              wide
            />
            <div className="ab-principles">
              {PRINCIPLES.map((p, i) => (
                <article key={p.n} className="px-card" data-reveal style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
                  <span className="cx-card-n" style={{ color: "var(--brand-lime)", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>
                    {p.n}
                  </span>
                  <h3>{p.title}</h3>
                  <p className="body">{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="px-section">
          <div className="px-inner">
            <SectionHead
              icon={<Route size={32} strokeWidth={1.4} aria-hidden="true" />}
              label="How it works"
              title="From a link to being cited."
              blurb="One workflow, from learning your brand to proving the results."
              wide
            />
            <div className="ab-steps" data-reveal>
              {STEPS.map((s) => (
                <div key={s.title} className="ab-step">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WhatsNew title="New in Mellox" blurb="The newest ways Mellox works for you and with the tools you already use." />

        {/* Audiences */}
        <section id="who" className="px-section">
          <div className="px-inner">
            <SectionHead
              icon={<Users size={32} strokeWidth={1.4} aria-hidden="true" />}
              label="Who it's for"
              title="Built for the people actually doing the marketing."
              blurb="Not a feature for a procurement committee. A tool for the one or two people responsible for the brand showing up."
              wide
            />
            <div className="ab-aud">
              {AUDIENCES.map((a, i) => (
                <article key={a.title} className="px-card" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3>{a.title}</h3>
                  <p className="body">{a.body}</p>
                  <div className="gapper" />
                  {a.cta.href.startsWith("http") ? (
                    <a href={a.cta.href} className="px-cta hero-cta">
                      {a.cta.label}
                    </a>
                  ) : (
                    <Link href={a.cta.href} className="px-cta hero-cta">
                      {a.cta.label}
                    </Link>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Closing */}
        <CtaBand
          title="See what AI says about your brand today."
          text="Start free, no card needed. Upgrade when you are ready to publish."
          primary={{ label: "Start free", href: "https://app.mellox.ai" }}
          secondary={{ label: "Contact us", href: "/contact" }}
        />
      </main>

      <Footer />
    </div>
  );
}
