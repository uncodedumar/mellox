"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import "./testimonials.css";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=900&h=1100&q=80`;

// Sample content: placeholder people and quotes. Photos are from Unsplash.
const testimonials = [
  {
    quote:
      "Mellox learned our brand from a single link and has not sounded off-voice once. We went from scrambling for posts to a full month of on-brand content, planned and published in an afternoon.",
    name: "Priya Nair",
    role: "Head of Growth, Altara Global",
    img: photo("1573496359142-b8d87734a5a2"),
  },
  {
    quote:
      "Two months in, ChatGPT and Perplexity started citing our guides. We never worked out how to get there on our own; Mellox told us which fixes mattered and did the rest.",
    name: "Daniel Brooks",
    role: "Founder, Northline Studio",
    img: photo("1560250097-0b93528c311a"),
  },
  {
    quote:
      "The four brains actually argue with each other, and you can feel it in the drafts. They are sharper and more specific to our customers, and nothing generic slips through.",
    name: "Sofia Alvarez",
    role: "Marketing Director, Lumen & Co",
    img: photo("1494790108377-be9c29b29330"),
  },
  {
    quote:
      "We run twelve client brands from one command deck. Approvals that took days now take minutes, and nobody on the team has to juggle nine logins any more.",
    name: "Marcus Hale",
    role: "CEO, Orbit Digital",
    img: photo("1519085360753-af0119f7cbe7"),
  },
  {
    quote:
      "One workspace for strategy, creation and distribution cut our tool stack from ten to one. The team finally spends its hours on strategy instead of busywork.",
    name: "Hannah Cole",
    role: "Head of Content, Vela Health",
    img: photo("1581065178047-8ee15951ede6"),
  },
  {
    quote:
      "The competitor brain showed us exactly where rivals were being recommended and we were not. Closing that gap was the best marketing decision we made this year.",
    name: "Omar Rahman",
    role: "Marketing Lead, Kestrel Labs",
    img: photo("1500648767791-00dcc994a43e"),
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; id: number } | null>(null);
  const n = testimonials.length;

  const go = useCallback((d: number) => setI((v) => Math.min(n - 1, Math.max(0, v + d))), [n]);

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

  return (
    <section id="testimonials" ref={rootRef} className="tm">
      <div className="tm-glow" aria-hidden="true">
        <span className="a" />
        <span className="b" />
      </div>

      <div className="tm-inner">
        <div className="tm-label" data-reveal>
          <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden="true">
            <path d="M2 14V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a8 8 0 0 1-8 8M18 14V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a8 8 0 0 1-8 8" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <span>TESTIMONIALS</span>
        </div>
        <div className="tm-rule" data-reveal />

        <div className="tm-head">
          <h2 data-reveal>Trusted by customers</h2>
          <p data-reveal style={{ transitionDelay: "120ms" }}>
            Proven outcomes shared by marketers, founders and agencies using Mellox.
          </p>
        </div>
      </div>

      <div
        className="tm-viewport"
        data-reveal
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, id: e.pointerId };
        }}
        onPointerUp={(e) => {
          if (!drag.current) return;
          const dx = e.clientX - drag.current.x;
          drag.current = null;
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
      >
        <div className="tm-track" style={{ ["--i" as string]: i }}>
          {testimonials.map((t, k) => (
            <figure
              key={t.name}
              className={`tm-card ${k === i ? "is-active" : ""}`}
              aria-hidden={k !== i}
              onClick={() => k !== i && setI(k)}
            >
              <div className="tm-photo">
                <Image
                  src={t.img}
                  alt={`Portrait of ${t.name}`}
                  fill
                  sizes="(max-width: 800px) 90vw, 480px"
                  draggable={false}
                />
              </div>
              <div className="tm-body">
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="tm-nav">
        <button type="button" onClick={() => go(-1)} disabled={i === 0} aria-label="Previous testimonial">
          <ChevronLeft size={22} strokeWidth={1.6} />
        </button>
        <span className="tm-count" aria-live="polite">
          {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => go(1)} disabled={i === n - 1} aria-label="Next testimonial">
          <ChevronRight size={22} strokeWidth={1.6} />
        </button>
      </div>
    </section>
  );
}
