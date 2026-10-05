import { Check, FlaskConical } from "lucide-react";
import { TRY_FIRST } from "@/lib/pricing";
import SectionHead from "./SectionHead";

const APP_URL = "https://app.mellox.ai";

export default function PricingTry() {
  return (
    <section id="trial" className="px-section">
      <div className="px-inner">
        <SectionHead
          icon={<FlaskConical size={32} strokeWidth={1.4} aria-hidden="true" />}
          label="Try it first"
          title="Start free. See your brand through AI's eyes."
          blurb="Two ways in. Pick the one that fits how much you want to test."
          wide
        />
        <div className="px-try">
          {TRY_FIRST.map((t, i) => (
            <article key={t.id} className="px-card" data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="px-kicker">{t.kicker}</span>
              <h3>{t.name}</h3>
              <p className="blurb">{t.blurb}</p>
              <ul className="px-feats">
                {t.features.map((f) => (
                  <li key={f}>
                    <span className="px-tick">
                      <Check strokeWidth={2.4} aria-hidden="true" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href={APP_URL} className={`px-cta ${t.id === "free" ? "px-cta-lime" : "hero-cta"}`}>
                {t.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
