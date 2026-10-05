import { Map } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/compare";
import SectionHead from "../pricing/SectionHead";

export default function CompareLandscape() {
  return (
    <section id="landscape" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<Map size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="The landscape"
          title="Four kinds of tools, one missing loop."
          blurb="Most AI marketing products are built for one job. Here is how the market splits and what each group leaves out."
          wide
        />
        <div className="cx-land">
          {CATEGORIES.map((c, i) => (
            <article key={c.id} className="px-card" data-reveal style={{ transitionDelay: `${(i % 2) * 90}ms` }}>
              <span className="cx-card-n">0{i + 1}</span>
              <h3>{c.title}</h3>
              <p className="blurb">{c.blurb}</p>
              <div className="cx-chips">
                {c.platforms.map((p) => (
                  <span key={p.name}>{p.name}</span>
                ))}
              </div>
              <p className="cx-gap">
                <b>The gap</b>
                {c.gap}
              </p>
            </article>
          ))}

          <article className="px-card cx-bridge" data-reveal>
            <span className="cx-card-n">Mellox AI</span>
            <h3>Create, monitor and scale in one workspace.</h3>
            <p className="blurb">
              Mellox learns your brand, creates and publishes on-brand content, watches how ChatGPT, Gemini and
              Perplexity describe you, and turns every visibility gap into a drafted fix. Agencies get the same loop
              across every client brand.
            </p>
            <div className="cx-chips">
              <Link href="/pricing" className="px-cta px-cta-lime" style={{ marginTop: 0, display: "inline-block" }}>
                See pricing
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
