import { Check, Link2, Sparkles } from "lucide-react";
import type { FeatureSlug } from "@/lib/features";

/** Product illustration for each feature page. Static, decorative UI cards built from the brand palette. */

const ENGINES = [
  { name: "ChatGPT", icon: "openai" },
  { name: "Gemini", icon: "gemini" },
  { name: "Perplexity", icon: "perplexity" },
];
const CHANNELS = ["linkedin", "x", "instagram", "tiktok", "facebook", "youtube", "pinterest", "reddit", "threads"];

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/llms/${name}.svg`} alt="" width={size} height={size} />;
}

function BrandDna() {
  return (
    <div className="ft-vis ft-vis-3">
      <div className="ft-card">
        <h4>Brand voice</h4>
        {[
          ["Bold", 78],
          ["Warm", 56],
          ["Precise", 68],
        ].map(([l, v]) => (
          <div className="ft-slider" key={l}>
            <span>{l}</span>
            <i>
              <b style={{ width: `${v}%` }} />
            </i>
          </div>
        ))}
        <div className="ft-chips">
          <span>Positioning</span>
          <span>Tone</span>
          <span>Audience</span>
        </div>
      </div>
      <div className="ft-card">
        <h4>Hard rules</h4>
        {["Tone: confident", "No jargon", "Positioning intact"].map((r) => (
          <div className="ft-rule" key={r}>
            <Check size={15} aria-hidden="true" />
            {r}
          </div>
        ))}
      </div>
      <div className="ft-card ft-swap">
        <h4>Same request, on brand</h4>
        <p className="ft-before">Unlock synergy across every channel.</p>
        <p className="ft-after">Unlock clarity across every channel.</p>
        <span className="ft-badge">
          <Check size={13} aria-hidden="true" /> On-brand
        </span>
      </div>
    </div>
  );
}

function AiVisibility() {
  return (
    <div className="ft-vis ft-vis-1">
      <div className="ft-card ft-wide">
        <h4>Prompt tracked weekly</h4>
        <p className="ft-prompt">&ldquo;Best marketing platform for agencies?&rdquo;</p>
        <div className="ft-engines">
          {ENGINES.map((e, i) => (
            <div key={e.name} className="ft-engine">
              <Icon name={e.icon} size={26} />
              <span>{e.name}</span>
              <em className={i === 1 ? "no" : "yes"}>{i === 1 ? "Not named yet" : "Named"}</em>
            </div>
          ))}
        </div>
        <div className="ft-fix">
          <Sparkles size={16} aria-hidden="true" />
          <span>Fix proposed: add a clear comparison page for agencies</span>
          <b>Draft it</b>
        </div>
      </div>
    </div>
  );
}

function FourBrains() {
  const brains = [
    ["brand", "Brand Brain", "Never off-voice", "#b489d1"],
    ["customer", "Customer Brain", "Never generic", "#fe7032"],
    ["competitor", "Competitor Brain", "Never blindsided", "#0756e7"],
    ["market", "Market Brain", "Never stale", "#ee3445"],
  ];
  return (
    <div className="ft-vis ft-vis-brains">
      {brains.map(([k, n, t, c]) => (
        <div key={k} className="ft-card ft-brain" style={{ ["--c" as string]: c }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/brains/${k}.svg`} alt="" width={44} height={44} />
          <div>
            <h4>{n}</h4>
            <p>{t}</p>
          </div>
        </div>
      ))}
      <span className="ft-agree">
        <Check size={16} aria-hidden="true" />
        All four agree
      </span>
    </div>
  );
}

function Distribution() {
  const rows = [
    ["linkedin", "Launch announcement", "Needs approval", "amber"],
    ["instagram", "Carousel: 5 tips", "Scheduled · Tue 9:00", "blue"],
    ["x", "Thread: what we learned", "Published", "lime"],
  ];
  return (
    <div className="ft-vis ft-vis-1">
      <div className="ft-card ft-wide">
        <h4>Content queue</h4>
        {rows.map(([ic, t, s, tone]) => (
          <div className="ft-row" key={t}>
            <Icon name={ic} />
            <span>{t}</span>
            <em className={`tone-${tone}`}>{s}</em>
          </div>
        ))}
        <div className="ft-channels" aria-hidden="true">
          {CHANNELS.map((c) => (
            <Icon key={c} name={c} size={20} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AgencyMode() {
  const clients = [
    ["C", "Coffee brand", true],
    ["D", "Dental clinic", false],
    ["F", "Fitness studio", false],
    ["S", "Design studio", false],
  ];
  return (
    <div className="ft-vis ft-vis-2">
      <div className="ft-card">
        <h4>Client brands</h4>
        {clients.map(([i, n, on]) => (
          <div key={n as string} className={`ft-client${on ? " on" : ""}`}>
            <span>{i}</span>
            {n}
          </div>
        ))}
      </div>
      <div className="ft-card">
        <h4>Pooled credits</h4>
        <div className="ft-pool">
          <i>
            <b style={{ width: "62%" }} />
          </i>
          <span>Shared across every brand</span>
        </div>
        <div className="ft-link">
          <Link2 size={15} aria-hidden="true" />
          Client portal link
          <b>Copy</b>
        </div>
        <div className="ft-chips">
          <span>White label ready</span>
        </div>
      </div>
    </div>
  );
}

export default function FeatureVisual({ slug }: { slug: FeatureSlug }) {
  switch (slug) {
    case "brand-dna":
      return <BrandDna />;
    case "ai-visibility":
      return <AiVisibility />;
    case "four-brains":
      return <FourBrains />;
    case "distribution":
      return <Distribution />;
    case "agency-mode":
      return <AgencyMode />;
  }
}
