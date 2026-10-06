import { Check, Link2, Sparkles } from "lucide-react";
import type { FeatureSlug } from "@/lib/features";
import "./visual-motion.css";

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

/**
 * Autopilot: a looping, CSS-only animation. The four workflow steps light up one after another while a feed shows what
 * Mellox is doing right now. (All timing lives in features.css, `.ap-*`; it stops for reduced-motion users.)
 */
function Autopilot() {
  const steps = ["Plan", "Create", "Approve", "Publish"];
  const feed = [
    { icon: "linkedin", text: "Planning next week's content from your goals", tag: "Planning" },
    { icon: "instagram", text: "Drafting a carousel in your Brand DNA voice", tag: "Creating" },
    { icon: "x", text: "Thread ready for your approval", tag: "Approval" },
    { icon: "tiktok", text: "Scheduled for Tuesday at 9:00", tag: "Publishing" },
  ];
  return (
    <div className="ft-vis ft-vis-1">
      <div className="ft-card ft-wide ap">
        <div className="ap-head">
          <h4>Autopilot</h4>
          <span className="ap-on">
            <i aria-hidden="true" />
            Running
          </span>
        </div>

        <ol className="ap-steps" aria-label="Autopilot workflow">
          {steps.map((s, i) => (
            <li key={s} style={{ ["--i" as string]: i }}>
              <span className="ap-dot">{i + 1}</span>
              <b>{s}</b>
            </li>
          ))}
        </ol>

        <ul className="ap-feed">
          {feed.map((f, i) => (
            <li key={f.tag} style={{ ["--i" as string]: i }}>
              <Icon name={f.icon} size={20} />
              <span>{f.text}</span>
              <em>{f.tag}</em>
              <i className="ap-bar" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Connections: Mellox in the middle, assistants on the left and apps on the right, with a pulse of data travelling along
 * each link. Lines are an SVG overlay (percent coordinates); nodes are absolutely positioned on the same grid.
 */
function Connections() {
  const hub = { x: 50, y: 50 };
  const nodes = [
    { name: "Claude", note: "MCP", x: 13, y: 24, img: "/llms/claude.svg", invert: true },
    { name: "ChatGPT", note: "MCP", x: 13, y: 76, img: "/llms/openai.svg", invert: true },
    { name: "Slack", note: "Team chat", x: 87, y: 17, img: "/logos/slack.webp" },
    { name: "Notion", note: "Docs", x: 87, y: 50, img: "/logos/notion.webp" },
    { name: "Canva", note: "Edit images", x: 87, y: 83, img: "/logos/canva.webp" },
  ];
  return (
    <div className="ft-vis ft-vis-1 cn-wrap">
      <div className="cn" role="img" aria-label="Mellox connected to Claude, ChatGPT, Slack, Notion and Canva">
        <svg viewBox="0 0 200 100" aria-hidden="true">
          {nodes.map((n, i) => (
            <g key={n.name}>
              <line x1={hub.x * 2} y1={hub.y} x2={n.x * 2} y2={n.y} className="cn-link" />
              <line
                x1={hub.x * 2}
                y1={hub.y}
                x2={n.x * 2}
                y2={n.y}
                pathLength={100}
                className={`cn-pulse${i < 2 ? " in" : ""}`}
                style={{ ["--i" as string]: i }}
              />
            </g>
          ))}
        </svg>

        <div className="cn-hub" style={{ left: `${hub.x}%`, top: `${hub.y}%` }}>
          <span className="cn-ring r1" />
          <span className="cn-ring r2" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/mark-lime.svg" alt="" width={54} height={28} />
        </div>

        {nodes.map((n, i) => (
          <div key={n.name} className="cn-node" style={{ left: `${n.x}%`, top: `${n.y}%`, ["--i" as string]: i }}>
            <span className="cn-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={n.img} alt="" width={30} height={30} className={n.invert ? "inv" : undefined} />
            </span>
            <b>{n.name}</b>
            <em>{n.note}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureVisual({ slug }: { slug: FeatureSlug }) {
  switch (slug) {
    case "autopilot":
      return <Autopilot />;
    case "connections":
      return <Connections />;
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
