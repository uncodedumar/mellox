"use client";

import { Check, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "./workflow.css";

/* ------------------------------------------------------------------ */
/* motion illustrations (UI mocks). They only animate while active.    */
/* ------------------------------------------------------------------ */

function WinBar({ title }: { title: string }) {
  return (
    <div className="win-bar">
      <i />
      <i />
      <i />
      <span>{title}</span>
    </div>
  );
}

const rv = (d: number) => ({ animationDelay: `${d}s` });

function BrandDnaIll() {
  return (
    <div className="win" aria-hidden="true">
      <WinBar title="Brand DNA" />
      <div className="win-body i1">
        <div className="urlbar">
          <span className="globe" />
          <span className="typed">https://yourbrand.com</span>
          <b className="go">Analyze</b>
        </div>
        <div className="dna">
          <span className="scan" />
          <div className="dna-card c-pos rv" style={rv(2.2)}>
            <em>Positioning</em>
            <u style={{ width: "92%" }} />
            <u style={{ width: "74%" }} />
            <u style={{ width: "58%" }} />
          </div>
          <div className="dna-card c-tone rv" style={rv(2.9)}>
            <em>Tone</em>
            <div className="chips">
              <span>Bold</span>
              <span>Warm</span>
              <span>Precise</span>
            </div>
          </div>
          <div className="dna-card c-pal rv" style={rv(3.6)}>
            <em>Palette</em>
            <div className="dots">
              <i style={{ background: "#CBE960" }} />
              <i style={{ background: "#B489D1" }} />
              <i style={{ background: "#FE7032" }} />
              <i style={{ background: "#0756E7" }} />
            </div>
          </div>
          <div className="dna-card c-aud rv" style={rv(4.3)}>
            <em>Audience</em>
            <div className="avs">
              <i />
              <i />
              <i />
              <span>Growth marketers</span>
            </div>
          </div>
        </div>
        <div className="ready rv" style={rv(5.2)}>
          <Check size={14} strokeWidth={2.6} /> Brand DNA ready
        </div>
      </div>
    </div>
  );
}

function StrategyIll() {
  const cells = Array.from({ length: 28 });
  const posts: Record<number, string> = {
    1: "#B489D1",
    3: "#0756E7",
    4: "#FE7032",
    8: "#CBE960",
    10: "#EE3445",
    12: "#B489D1",
    15: "#0756E7",
    17: "#FE7032",
    19: "#CBE960",
    22: "#EE3445",
    24: "#B489D1",
    26: "#0756E7",
  };
  let k = 0;
  return (
    <div className="win" aria-hidden="true">
      <WinBar title="Content calendar · Coach" />
      <div className="win-body i2">
        <div className="cal">
          <div className="cal-head">
            <b>October</b>
            <span>12 posts planned</span>
          </div>
          <div className="cal-grid">
            {cells.map((_, i) => (
              <span key={i} className="cell">
                {posts[i] ? (
                  <i className="post rv" style={{ background: posts[i], animationDelay: `${0.8 + k++ * 0.34}s` }} />
                ) : null}
              </span>
            ))}
          </div>
        </div>
        <div className="coach">
          <div className="msg me rv" style={rv(0.4)}>
            Brief: launch week posts
          </div>
          <div className="msg ai rv" style={rv(1.6)}>
            <Sparkles size={12} />
            <span className="typing">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="draft-card rv" style={rv(3.4)}>
            <em>Draft · LinkedIn</em>
            <u style={{ width: "96%" }} />
            <u style={{ width: "84%" }} />
            <u style={{ width: "52%" }} />
            <b className="approve">
              <Check size={12} strokeWidth={2.8} /> Approve
            </b>
          </div>
        </div>
      </div>
    </div>
  );
}

const channels = [
  { icon: "linkedin", name: "LinkedIn", note: "Long-form post" },
  { icon: "x", name: "X", note: "Thread · 4 posts" },
  { icon: "instagram", name: "Instagram", note: "Carousel + caption" },
  { icon: "tiktok", name: "TikTok", note: "15s script" },
  { icon: "facebook", name: "Facebook", note: "Link post" },
];

function DistributionIll() {
  return (
    <div className="win" aria-hidden="true">
      <WinBar title="Publish" />
      <div className="win-body i3">
        <div className="prompt">
          <Sparkles size={14} />
          <span className="p-text">Announce our launch</span>
        </div>
        <div className="routes">
          {channels.map((c, i) => (
            <div className="route" key={c.name}>
              <span className="wire" style={rv(i * 0.45)} />
              <span className="tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/llms/${c.icon}.svg`} alt="" />
              </span>
              <span className="variant">
                <b>{c.name}</b>
                <small>{c.note}</small>
              </span>
              <span className="status rv" style={rv(1.2 + i * 0.55)}>
                <Check size={11} strokeWidth={3} /> Published
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const signals = ["llms.txt", "Schema", "Crawlability", "Citations", "Authority", "Freshness"];
const metrics = [
  ["Organic", "+24%"],
  ["Social", "+18%"],
  ["AI mentions", "+62%"],
];

function VisibilityIll() {
  return (
    <div className="win" aria-hidden="true">
      <WinBar title="AI visibility · Insights" />
      <div className="win-body i4">
        <div className="vis-top">
          <div className="gauge">
            <svg viewBox="0 0 100 100">
              <circle className="g-bg" cx="50" cy="50" r="40" />
              <circle className="g-fg" cx="50" cy="50" r="40" pathLength="100" />
            </svg>
            <div className="g-num">
              <b>87</b>
              <small>GEO score</small>
            </div>
          </div>
          <div className="sigs">
            {signals.map((s, i) => (
              <div className="sig" key={s}>
                <span>{s}</span>
                <i>
                  <b style={rv(0.3 + i * 0.25)} />
                </i>
              </div>
            ))}
          </div>
        </div>
        <div className="cites">
          {["openai", "gemini", "perplexity", "claude"].map((m, i) => (
            <span className="cite rv" key={m} style={rv(1.8 + i * 0.5)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/llms/${m}.svg`} alt="" />
              cited
            </span>
          ))}
        </div>
        <div className="metrics">
          {metrics.map(([label, val], i) => (
            <div className="metric rv" key={label} style={rv(3 + i * 0.4)}>
              <small>{label}</small>
              <b>{val}</b>
              <span className="spark">
                {Array.from({ length: 8 }).map((_, j) => (
                  <i key={j} style={{ animationDelay: `${j * 0.1}s` }} />
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const clients = [
  ["Northwind", "#B489D1", 4],
  ["Acme Co", "#FE7032", 3],
  ["Lumen", "#0756E7", 2],
  ["Orbit", "#CBE960", 2],
  ["Vela", "#EE3445", 1],
] as const;

function AgencyIll() {
  return (
    <div className="win" aria-hidden="true">
      <WinBar title="Agency command deck" />
      <div className="win-body i5">
        <div className="roster">
          {clients.map(([name, color, n], i) => (
            <div className="client" key={name} style={{ animationDelay: `${i * 1.6}s` }}>
              <i style={{ background: color }} />
              <span>{name}</span>
              <em>{n}</em>
            </div>
          ))}
        </div>
        <div className="queue">
          <div className="q-head">
            <b>Unified queue</b>
            <span>12 pending</span>
          </div>
          {[
            ["Northwind", "#B489D1", "Launch carousel"],
            ["Acme Co", "#FE7032", "Case study post"],
            ["Lumen", "#0756E7", "AEO article"],
            ["Orbit", "#CBE960", "Weekly recap"],
          ].map(([n, c, t], i) => (
            <div className="q-item rv" key={t} style={rv(0.5 + i * 0.5)}>
              <i style={{ background: c }} />
              <span>
                <b>{t}</b>
                <small>{n}</small>
              </span>
              <span className="ok" style={rv(3 + i * 0.6)}>
                <Check size={11} strokeWidth={3} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const steps = [
  {
    tab: "Brand DNA",
    eyebrow: "01 · BRAND DNA",
    title: "Paste a link. We learn your brand.",
    text: "Mellox extracts your positioning, tone and audience into a living Brand DNA in seconds.",
    points: [
      "One URL brand extraction",
      "Living tone, voice & audience profile",
      "Unlimited brands per workspace",
    ],
    color: "#CBE960",
    Ill: BrandDnaIll,
  },
  {
    tab: "Strategy & Creation",
    eyebrow: "02 · STRATEGY & CREATION",
    title: "Plan it. Create it. On-brand.",
    text: "Describe your goals once and Mellox maps weeks of posts across every channel, then your AI coach briefs, drafts and refines each one in your exact voice.",
    points: [
      "Monthly calendar tuned to your goals",
      "Drafts in your exact voice from guided briefs",
      "Drag and drop by day, one-tap approval",
    ],
    color: "#B489D1",
    Ill: StrategyIll,
  },
  {
    tab: "Distribution",
    eyebrow: "03 · DISTRIBUTION",
    title: "One prompt. Every channel.",
    text: "Native posts for LinkedIn, X, Instagram, TikTok and more, published on your schedule.",
    points: [
      "Native variant per platform",
      "Schedule, queue or publish instantly",
      "Auto-hashtags, mentions & first comment",
    ],
    color: "#FE7032",
    Ill: DistributionIll,
  },
  {
    tab: "AI Visibility",
    eyebrow: "04 · AI VISIBILITY & INTELLIGENCE",
    title: "Get cited, then prove it.",
    text: "AEO articles and technical fixes so AI engines quote your site, with every organic, social and AI-mention metric unified in a plain-English snapshot.",
    points: [
      "AEO / GEO articles built to be cited",
      "Live GEO score and ranked fixes: llms.txt, schema, crawl",
      "Unified dashboards synced from Google, Meta & LLMs",
    ],
    color: "#0756E7",
    Ill: VisibilityIll,
  },
  {
    tab: "Agency Mode",
    eyebrow: "05 · AGENCY MODE",
    title: "Every client, one command deck.",
    text: "Switch brands, approve work and track activity across your whole roster, with zero context-switching.",
    points: [
      "Unified queue across all brands",
      "Client approvals & shared roles",
      "Scale to dozens of accounts",
    ],
    color: "#EE3445",
    Ill: AgencyIll,
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const STICKY_TOP = 92;
const N = steps.length;

export default function Workflow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const segRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let raf = 0;
    const seg = () => window.innerHeight * 0.8;

    const update = () => {
      raf = 0;
      const P = clamp((STICKY_TOP - wrap.getBoundingClientRect().top) / seg(), 0, N - 1);
      segRefs.current.forEach((el, j) => {
        if (el) el.style.transform = `scaleX(${clamp(P - j)})`;
      });
      const a = Math.min(N - 1, Math.floor(P + 0.001));
      if (a !== activeRef.current) {
        activeRef.current = a;
        setActive(a);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const y = window.scrollY + wrap.getBoundingClientRect().top - STICKY_TOP + i * window.innerHeight * 0.8 + (i ? 6 : 0);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section id="workflow" ref={rootRef} className="wf">
      <div className="wf-inner">
        <div className="wf-label" data-reveal>
          <svg width="38" height="28" viewBox="0 0 38 28" fill="none" aria-hidden="true">
            <rect x="5" y="2" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M1 24h36" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span>WORKFLOW</span>
        </div>
        <div className="wf-rule" data-reveal />

        <div className="wf-head">
          <h2 data-reveal>From a website to a cited brand.</h2>
          <p data-reveal style={{ transitionDelay: "120ms" }}>
            One continuous workflow, start to finish, with nothing stitched together from separate tabs.
          </p>
        </div>

        <div ref={wrapRef} className="wf-pin">
          <div className="wf-stage">
            <div className="wf-tabs" role="tablist" aria-label="Workflow steps">
              {steps.map((s, i) => (
                <div className="wf-tabwrap" key={s.tab}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    className={`wf-tab ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}
                    onClick={() => goTo(i)}
                  >
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="t">{s.tab}</span>
                  </button>
                  {i < N - 1 && (
                    <span className="wf-seg" aria-hidden="true">
                      <span
                        ref={(el) => {
                          segRefs.current[i] = el;
                        }}
                      />
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="wf-cards">
              {steps.map((s, i) => (
                <article
                  key={s.tab}
                  className={`wf-card ${i === active ? "is-active" : i < active ? "is-before" : "is-after"}`}
                  style={{ ["--sc" as string]: s.color }}
                  aria-hidden={i !== active}
                >
                  <div className="wf-glow" aria-hidden="true" />
                  <div className="grain-tex pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div className="wf-copy">
                    <span className="wf-eyebrow">{s.eyebrow}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ul>
                      {s.points.map((pt, k) => (
                        <li key={pt} style={{ transitionDelay: `${0.25 + k * 0.1}s` }}>
                          <span className="tick">
                            <Check size={13} strokeWidth={2.6} />
                          </span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="wf-ill">
                    <s.Ill />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
