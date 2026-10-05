"use client";

import {
  BarChart3,
  CalendarDays,
  Clock,
  FileText,
  Image as ImageIcon,
  Link2,
  Lock,
  Mail,
  MessageSquare,
  Search,
  Sparkles,
  Table2,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import "./problems.css";

const tools = [
  { Icon: CalendarDays, x: 10, y: 14, d: 1 },
  { Icon: Search, x: 38, y: 8, d: 2 },
  { Icon: FileText, x: 68, y: 16, d: 3 },
  { Icon: MessageSquare, x: 84, y: 44, d: 2 },
  { Icon: Table2, x: 60, y: 62, d: 1 },
  { Icon: Mail, x: 30, y: 58, d: 3 },
  { Icon: BarChart3, x: 6, y: 50, d: 2 },
  { Icon: ImageIcon, x: 46, y: 36, d: 1 },
  { Icon: Link2, x: 22, y: 34, d: 3 },
  { Icon: Clock, x: 76, y: 76, d: 2 },
];

const socials = [
  "facebook",
  "instagram",
  "youtube",
  "reddit",
  "linkedin",
  "pinterest",
  "tiktok",
  "x",
  "threads",
];

const memory = ["Brand", "Customers", "Competitors", "Market"];

function ToolsIllustration() {
  return (
    <div className="ill ill-tools" aria-hidden="true">
      <svg className="tangle" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M10 14 L84 44 L30 58 L68 16 L6 50 L60 62 L38 8 L76 76 L22 34 L46 36 L10 14" />
        <path d="M38 8 L22 34 L60 62 L84 44 L46 36 L68 16" />
        <path d="M6 50 L46 36 L76 76 L30 58" />
      </svg>
      {tools.map(({ Icon, x, y, d }, i) => (
        <span
          key={i}
          className={`chip chip-d${d}`}
          style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${-i * 0.9}s` }}
        >
          <Icon size={20} strokeWidth={1.7} />
        </span>
      ))}
      <span className="tool-count">10 tools</span>
    </div>
  );
}

function CitedIllustration() {
  return (
    <div className="ill ill-cited" aria-hidden="true">
      <div className="chat">
        <div className="bubble user" style={{ animationDelay: "0s" }}>
          Best marketing platform for agencies?
        </div>
        <div className="bubble ai" style={{ animationDelay: "1.1s" }}>
          <div className="ai-head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/llms/openai.svg" alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/llms/gemini.svg" alt="" />
            <span className="typing">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="row" style={{ animationDelay: "2.2s" }}>
            <b>1</b> Competitor A <em>cited</em>
          </div>
          <div className="row" style={{ animationDelay: "2.8s" }}>
            <b>2</b> Competitor B <em>cited</em>
          </div>
          <div className="row" style={{ animationDelay: "3.4s" }}>
            <b>3</b> Competitor C <em>cited</em>
          </div>
          <div className="row ghost" style={{ animationDelay: "4.2s" }}>
            <b>
              <X size={12} strokeWidth={2.4} />
            </b>
            Your brand <em>not cited</em>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginsIllustration() {
  return (
    <div className="ill ill-logins" aria-hidden="true">
      <div className="grid-9">
        {socials.map((s, i) => (
          <span key={s} className="tile" style={{ animationDelay: `${-i * 0.37}s` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/llms/${s}.svg`} alt="" />
            <span className="lock" style={{ animationDelay: `${-i * 0.5}s` }}>
              <Lock size={10} strokeWidth={2.6} />
            </span>
          </span>
        ))}
      </div>
      <div className="energy">
        <span className="energy-label">Energy</span>
        <span className="energy-track">
          <span className="energy-fill" />
        </span>
        <span className="energy-end">Burnout</span>
      </div>
    </div>
  );
}

function ForgetsIllustration() {
  return (
    <div className="ill ill-forgets" aria-hidden="true">
      <div className="prompt">
        <Sparkles size={14} strokeWidth={2} />
        <span className="prompt-text">Write a post about our launch</span>
      </div>
      <div className="draft">
        <span style={{ animationDelay: "0.4s", width: "92%" }} />
        <span style={{ animationDelay: "0.9s", width: "78%" }} />
        <span style={{ animationDelay: "1.4s", width: "86%" }} />
        <span style={{ animationDelay: "1.9s", width: "46%" }} />
      </div>
      <div className="mem">
        {memory.map((m, i) => (
          <span key={m} className="mem-chip" style={{ animationDelay: `${i * 0.55}s` }}>
            {m}
          </span>
        ))}
      </div>
      <span className="mem-status">Memory: 0 · starting from zero</span>
    </div>
  );
}

const cards = [
  {
    title: "Ten tools, zero strategy",
    text: "Agencies juggle a scheduler, an SEO tool, a doc, a chatbot and a spreadsheet, and still ship late.",
    Ill: ToolsIllustration,
    tone: "tone-a",
  },
  {
    title: "Invisible to ChatGPT & Gemini",
    text: "Buyers now ask AI first. If it doesn't cite you, you don't exist.",
    Ill: CitedIllustration,
    tone: "tone-b",
  },
  {
    title: "Nine logins, one burnout",
    text: "Posting separately to every platform means separately tracking and calendaring every platform. The busywork eats the hours you meant to spend on strategy.",
    Ill: LoginsIllustration,
    tone: "tone-c",
  },
  {
    title: "AI that writes, but forgets",
    text: "A generic model can draft one good post, but it has no shared memory of your brand, customers, competitors and market, so the next prompt starts from zero again.",
    Ill: ForgetsIllustration,
    tone: "tone-d",
  },
];

export default function Problems() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <section id="problems" ref={rootRef} className="problems">
      <div className="problems-inner">
        <div className="problems-label" data-reveal>
          <svg width="26" height="24" viewBox="0 0 26 24" fill="none" aria-hidden="true">
            <path d="M2 1v21h22" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="9" cy="14" r="1.2" fill="currentColor" />
            <circle cx="14" cy="9" r="1.2" fill="currentColor" />
            <circle cx="19" cy="15" r="1.2" fill="currentColor" />
            <circle cx="22" cy="6" r="1.2" fill="currentColor" />
          </svg>
          <span>PROBLEMS</span>
        </div>
        <div className="problems-rule" data-reveal />

        <div className="problems-head">
          <h2 data-reveal>
            What&apos;s holding
            <br />
            growth back
          </h2>
          <p data-reveal style={{ transitionDelay: "120ms" }}>
            Fragmented tools, invisible brands and forgetful AI: the reasons marketing
            teams keep falling behind.
          </p>
        </div>

        <div className="problems-grid">
          {cards.map(({ title, text, Ill, tone }, i) => (
            <article
              key={title}
              className={`pcard ${tone}`}
              data-reveal
              style={{ transitionDelay: `${(i % 2) * 120}ms` }}
            >
              <div className="pcard-bg" aria-hidden="true">
                <span className="pb pb1" />
                <span className="pb pb2" />
                <span className="pb pb3" />
              </div>
              <div className="grain-tex pointer-events-none absolute inset-0" aria-hidden="true" />
              <Ill />
              <div className="pcard-caption">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
