import { Check, Trophy, X } from "lucide-react";
import Link from "next/link";
import { STACK, WINS } from "@/lib/compare";
import SectionHead from "../pricing/SectionHead";

export default function CompareWins() {
  return (
    <section id="how-we-win" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<Trophy size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="How Mellox wins"
          title="Four reasons teams pick Mellox."
          blurb="Not by out-featuring every specialist, but by owning the workflow none of them are built to serve."
          wide
        />
        <div className="cx-wins">
          {WINS.map((w, i) => (
            <article
              key={w.n}
              className="px-card"
              data-reveal
              style={{ transitionDelay: `${(i % 2) * 90}ms` }}
            >
              <span className="cx-card-n">{w.n}</span>
              <h3>{w.title}</h3>
              <p className="body">{w.body}</p>
              {w.example && <p className="cx-example">{w.example}</p>}
              <div className="gapper" />
              <div className="cx-move">
                <b>What it means for you</b>
                {w.move}
              </div>
            </article>
          ))}
        </div>

        <div className="cx-stack">
          <article className="px-card" data-reveal>
            <span className="cx-card-n">The stack you would otherwise buy</span>
            <h3 style={{ marginTop: 12 }}>Two tools, two logins, no shared brand memory.</h3>
            <div style={{ marginTop: 20 }}>
              {STACK.rows.map((r) => (
                <div key={r.tool} className="cx-s-row">
                  <span>
                    {r.tool}
                    <small>{r.job}</small>
                  </span>
                  <b>{r.price}</b>
                </div>
              ))}
              <div className="cx-s-row">
                <span>Combined at list price</span>
                <b className="cx-s-total" style={{ fontSize: 28 }}>
                  {STACK.total}/mo
                </b>
              </div>
            </div>
            <ul>
              <li style={{ display: "flex", gap: 10 }}>
                <X size={18} aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--brain-orange)" }} />
                No hand-off from a visibility finding to a drafted fix
              </li>
              <li style={{ display: "flex", gap: 10 }}>
                <X size={18} aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--brain-orange)" }} />
                Brand voice has to be re-taught in every tool
              </li>
            </ul>
          </article>

          <article className="px-card lime featured" data-reveal style={{ transitionDelay: "90ms" }}>
            <span className="cx-card-n">Mellox Starter</span>
            <h3 style={{ marginTop: 12 }}>One workspace for the whole loop.</h3>
            <p style={{ marginTop: 22 }}>
              <span className="cx-s-total">{STACK.mellox}</span>
              <span style={{ marginLeft: 8, color: "#8b97c2" }}>/mo, or $41 billed annually</span>
            </p>
            <ul>
              {[
                "Brand DNA scan and Brand Kit included",
                "25 tracked AI prompts, checked weekly",
                "Content, images and publishing in the same place",
                "Audit findings open Studio with a drafted fix",
              ].map((t) => (
                <li key={t} style={{ display: "flex", gap: 10 }}>
                  <Check size={18} aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--brand-lime)" }} />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="px-cta px-cta-lime">
              See all plans
            </Link>
          </article>
        </div>
        <p className="cx-note" data-reveal>
          Competitor prices are public list prices and change often. Check each vendor for current pricing.
        </p>
      </div>
    </section>
  );
}
