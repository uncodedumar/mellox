"use client";

import { Check, Columns2, Sparkles } from "lucide-react";
import { useState } from "react";
import { PLANS, type Plan } from "@/lib/pricing";
import SectionHead from "./SectionHead";

const APP_URL = "https://app.mellox.ai";
const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

function PlanCard({ plan, annual, index }: { plan: Plan; annual: boolean; index: number }) {
  const m = plan.monthly;
  return (
    <article
      className={`px-card ${plan.featured ? "featured" : ""}`}
      data-reveal
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <div className="px-plan-top">
        <h3>{plan.name}</h3>
        {plan.badge && <span className="px-badge">{plan.badge}</span>}
      </div>
      <p className="px-tagline">{plan.tagline}</p>

      <div className="px-credits">
        <div className="px-credits-main">
          <Sparkles size={18} aria-hidden="true" />
          <span>{plan.credits}</span>
        </div>
        <div>{plan.imagePosts}</div>
        <div>{plan.articles}</div>
        <div className="vc">{plan.video}</div>
        <div className="px-chips">
          {plan.chips.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
      </div>

      {m === null ? (
        <>
          <div className="px-price">
            <span className="now custom">Custom</span>
          </div>
          <p className="px-note">Volume pricing for networks and large teams</p>
          <a href="/demo?interest=scale" className="px-cta hero-cta">
            {plan.cta}
          </a>
          <p className="px-save">{plan.ctaNote}</p>
        </>
      ) : (
        <>
          <div className="px-price" aria-live="polite">
            {annual && <span className="old">{money(m)}</span>}
            <span className="now">{money(annual ? (m * 10) / 12 : m)}</span>
          </div>
          <p className="px-note">
            {annual ? `per month, billed annually (${money(m * 10)} a year)` : "per month, billed monthly"}
          </p>
          <a href={APP_URL} className={`px-cta ${plan.featured ? "px-cta-lime" : "hero-cta"}`}>
            {plan.cta}
          </a>
          <p className="px-save">
            {annual ? (
              <>
                Save <b>{money(m * 2)}</b> compared to monthly
              </>
            ) : (
              <>
                Annual billing saves <b>{money(m * 2)}</b> a year
              </>
            )}
          </p>
        </>
      )}

      <ul className="px-feats">
        {plan.featuresIntro && <li className="intro">{plan.featuresIntro}</li>}
        {plan.features.map((f) => (
          <li key={f}>
            <span className="px-tick">
              <Check strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingPlans() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="plans" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<Columns2 size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Plans"
          title="Simple plans. Credits you control."
          blurb="Every plan includes all four marketing brains. Credits pay for the work, video has its own allowance, and top-ups never expire."
          wide
        />

        <div className="px-toggle" role="group" aria-label="Billing period" data-reveal>
          <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>
            Monthly
          </button>
          <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
            Annual <span className="px-free-tag">2 months free</span>
          </button>
        </div>

        <div className="px-plans mt-8">
          {PLANS.map((p, i) => (
            <PlanCard key={p.id} plan={p} annual={annual} index={i} />
          ))}
        </div>
        <p className="px-foot" data-reveal>
          All prices in USD. Annual billing is 10 months for the price of 12.
        </p>
      </div>
    </section>
  );
}
