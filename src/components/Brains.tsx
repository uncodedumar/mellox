"use client";

import { useEffect, useRef, useState } from "react";
import "./brains.css";
import { prefersStaticMotion } from "@/lib/motion";
import { scrollToY } from "@/lib/smooth-scroll";

/* ---------------- motion illustrations ---------------- */

function BrandIll() {
  return (
    <div className="bi bi-brand" aria-hidden="true">
      <div className="gl-card voice">
        <div className="gl-title">Brand voice</div>
        {[
          ["Bold", "k1"],
          ["Warm", "k2"],
          ["Precise", "k3"],
        ].map(([label, k]) => (
          <div className="slider" key={label}>
            <span>{label}</span>
            <i className="track">
              <b className={`knob ${k}`} />
            </i>
          </div>
        ))}
      </div>

      <div className="gl-card check">
        <p>
          Unlock{" "}
          <span className="swap">
            <s className="bad">synergy</s>
            <u className="good">clarity</u>
          </span>{" "}
          across every channel.
        </p>
        <span className="badge-ok">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6.4l2.6 2.6L10 3.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          On-brand 98%
        </span>
      </div>

      <div className="gl-card rules">
        {["Tone: confident", "No jargon", "Positioning intact"].map((r, i) => (
          <div key={r} className="rule" style={{ animationDelay: `${i * 0.7}s` }}>
            <i />
            {r}
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomerIll() {
  return (
    <div className="bi bi-customer" aria-hidden="true">
      <span className="wave w1" />
      <span className="wave w2" />
      <span className="wave w3" />
      <div className="orbit">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="person" style={{ ["--a" as string]: `${i * 60}deg` }}>
            <i />
          </span>
        ))}
      </div>
      <span className="core" />
      <span className="intent it1">Ready to buy</span>
      <span className="intent it2">Comparing tools</span>
      <span className="intent it3">Needs proof</span>
    </div>
  );
}

function CompetitorIll() {
  return (
    <div className="bi bi-competitor" aria-hidden="true">
      <div className="radar">
        <span className="ring r1" />
        <span className="ring r2" />
        <span className="ring r3" />
        <span className="sweep" />
        <span className="blip b1" />
        <span className="blip b2" />
        <span className="blip b3" />
        <span className="blip gap" />
        <span className="gap-tag">Gap</span>
      </div>
      <div className="gl-card share">
        <div className="gl-title">AI answer share</div>
        {[
          ["Rival A", "bar1"],
          ["Rival B", "bar2"],
          ["Rival C", "bar3"],
          ["You", "bar4"],
        ].map(([label, cls]) => (
          <div key={label} className={`share-row ${label === "You" ? "me" : ""}`}>
            <span>{label}</span>
            <i>
              <b className={cls} />
            </i>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketIll() {
  return (
    <div className="bi bi-market" aria-hidden="true">
      <span className="drift d1">AI search</span>
      <span className="drift d2">Short video</span>
      <span className="drift d3">Community</span>
      <div className="gl-card chart">
        <div className="gl-title">Category trend</div>
        <div className="plot">
        <svg viewBox="0 0 300 130" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mk-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#EE3445" stopOpacity="0.45" />
                <stop offset="1" stopColor="#EE3445" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="area" d="M0 112 C40 104 60 92 90 96 C120 100 140 70 170 66 C200 62 220 40 250 30 C270 24 285 18 300 10 L300 130 L0 130 Z" fill="url(#mk-fill)" />
            <path className="line" d="M0 112 C40 104 60 92 90 96 C120 100 140 70 170 66 C200 62 220 40 250 30 C270 24 285 18 300 10" />
          </svg>
          <span className="pulse-dot" />
        </div>
        <span className="shift-tag">Shift detected ↗</span>
        <div className="bars">
          {Array.from({ length: 14 }).map((_, i) => (
            <b key={i} style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- data ---------------- */

const brains = [
  {
    key: "brand",
    num: "01",
    name: "Brand Brain",
    tag: "Never off-voice",
    text: "The keeper of who you are. It holds your voice, your positioning and the rules you never want broken, so every single thing Mellox makes still sounds unmistakably like you.",
    color: "#B489D1",
    c2: "#FE7032",
    c3: "#0756E7",
    Ill: BrandIll,
  },
  {
    key: "customer",
    num: "02",
    name: "Customer Brain",
    tag: "Never generic",
    text: "The one listening to your audience. It reads real intent and buying signal, so every draft is written for an actual person, not a generic stand-in for one.",
    color: "#FE7032",
    c2: "#B489D1",
    c3: "#0756E7",
    Ill: CustomerIll,
  },
  {
    key: "competitor",
    num: "03",
    name: "Competitor Brain",
    tag: "Never blindsided",
    text: "The one watching the room. It tracks exactly how rivals are showing up in AI answers and points straight at the gap most worth closing next.",
    color: "#0756E7",
    c2: "#FE7032",
    c3: "#CBE960",
    Ill: CompetitorIll,
  },
  {
    key: "market",
    num: "04",
    name: "Market Brain",
    tag: "Never stale",
    text: "The one looking further out. It scans the wider category for shifts and openings, so your strategy keeps moving instead of quietly going stale.",
    color: "#EE3445",
    c2: "#FE7032",
    c3: "#0756E7",
    Ill: MarketIll,
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);
const STICKY_TOP = 96;

export default function Brains() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const revealRef = useRef<HTMLElement>(null);

  // header / footer reveal
  useEffect(() => {
    const root = revealRef.current;
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

  // scroll-controlled card stack
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = prefersStaticMotion();
    let raf = 0;

    const seg = () => window.innerHeight * 0.85;

    const update = () => {
      raf = 0;
      const s = seg();
      const scrolled = clamp(STICKY_TOP - wrap.getBoundingClientRect().top, 0, 3 * s);
      const t = brains.map((_, i) => (i === 0 ? 1 : clamp((scrolled - (i - 1) * s) / s)));

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const e = ease(t[i]);
        const next = i < brains.length - 1 ? ease(t[i + 1]) : 0;
        const x = reduce ? 0 : (1 - e) * 110;
        const y = reduce ? (t[i] > 0 ? 0 : 100) : (1 - e) * 72;
        const scale = 1 - 0.05 * next;
        el.style.transform = `translate3d(${x}px, ${y}%, 0) scale(${scale})`;
        // small dead zone so an upcoming card never ghosts through before you scroll to it
        el.style.opacity = String(clamp((t[i] - 0.05) * 7) * (1 - 0.55 * next));
        el.style.pointerEvents = t[i] > 0.6 && next < 0.4 ? "auto" : "none";
      });

      const a = clamp(Math.floor(scrolled / s + 0.55), 0, brains.length - 1);
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
    const y = window.scrollY + wrap.getBoundingClientRect().top - STICKY_TOP + i * window.innerHeight * 0.85 + (i ? 4 : 0);
    scrollToY(y);
  };

  return (
    <section id="brains" ref={revealRef} className="brains">
      <div className="brains-inner">
        <div className="brains-label" data-reveal>
          <svg width="30" height="28" viewBox="0 0 30 28" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="14" height="7" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="13" width="14" height="7" rx="2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M24 2v24" stroke="currentColor" strokeWidth="1.4" />
            <path d="M16 6h6M16 16h6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span>THE BRAINS</span>
        </div>
        <div className="brains-rule" data-reveal />

        <div className="brains-head">
          <h2 data-reveal>Four brains behind every decision.</h2>
          <p data-reveal style={{ transitionDelay: "120ms" }}>
            No single mind can hold your brand&apos;s voice, your customer&apos;s intent, your
            competitor&apos;s next move and the market&apos;s direction all at once, so Mellox
            refuses to ask one to. Four specialist brains think in parallel, argue it out, and
            only agree before anything reaches you.
          </p>
        </div>

        <div ref={wrapRef} className="brains-pin">
          <div className="brains-stage">
            <nav className="brains-side" aria-label="The four brains">
              {brains.map((b, i) => (
                <button
                  key={b.key}
                  type="button"
                  className={`side-item ${i === active ? "is-active" : ""}`}
                  onClick={() => goTo(i)}
                  aria-current={i === active}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/brains/${b.key}.svg`} alt="" />
                  <span>{b.name}</span>
                </button>
              ))}
            </nav>

            <div className="brains-cards">
              {brains.map((b, i) => (
                <article
                  key={b.key}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="bcard"
                  style={{ zIndex: i + 1, ["--bc" as string]: b.color, ["--bc2" as string]: b.c2, ["--bc3" as string]: b.c3 }}
                >
                  <div className="bcard-copy">
                    <span className="bcard-num">{b.num}</span>
                    <h3>{b.name}</h3>
                    <p>{b.text}</p>
                    <span className="bcard-tag">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/brains/${b.key}.svg`} alt="" />
                      {b.tag}
                    </span>
                  </div>

                  <div className="bcard-ill">
                    <div className="bglow" aria-hidden="true">
                      <span className="g g1" />
                      <span className="g g2" />
                      <span className="g g3" />
                    </div>
                    <div className="grain-tex pointer-events-none absolute inset-0" aria-hidden="true" />
                    <b.Ill />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <p className="brains-foot" data-reveal>
          ONE WORKSPACE · FOUR BRAINS · ZERO CONTEXT SWITCHING
        </p>
      </div>
    </section>
  );
}
