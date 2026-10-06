"use client";

import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { type Faq as FaqItem } from "@/lib/faqs";
import "./faq.css";

function Column({ items, offset }: { items: FaqItem[]; offset: number }) {
  const base = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-col">
      {items.map((f, i) => {
        const isOpen = open === i;
        const id = `${base}-${i}`;
        return (
          // The scroll-reveal lives on this wrapper, whose className never changes. The reveal adds `is-in` straight to the
          // DOM node, so it must not share an element with the `is-open` class that React re-renders on every click:
          // React would overwrite the whole class attribute, drop `is-in`, and the card would fade out each time.
          <div key={f.q} className="faq-reveal" data-reveal style={{ transitionDelay: `${(i * 2 + offset) * 60}ms` }}>
            <div className={`faq-item ${isOpen ? "is-open" : ""}`}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <Plus size={22} strokeWidth={1.6} className="plus" aria-hidden="true" />
                </button>
              </h3>
              <div id={id} role="region" className="faq-panel">
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
            </div>
        );
      })}
    </div>
  );
}

export default function Faq({
  items,
  title,
  blurb,
  showAllLink = false,
  standalone = false,
}: {
  items: FaqItem[];
  title: string;
  blurb: string;
  showAllLink?: boolean;
  standalone?: boolean;
}) {
  const rootRef = useRef<HTMLElement>(null);

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
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // the standalone /faq page has no other h1, so its title is the page heading
  const Heading = standalone ? "h1" : "h2";

  // two independent columns so opening one answer never stretches its neighbour
  const left = items.filter((_, i) => i % 2 === 0);
  const right = items.filter((_, i) => i % 2 === 1);

  return (
    <section id="faq" ref={rootRef} className={`faq ${standalone ? "faq-standalone" : ""}`}>
      <div className="faq-inner">
        <div className="faq-label" data-reveal>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.5" />
            <path d="M16 14v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="16" cy="10" r="1.1" fill="currentColor" />
          </svg>
          <span>FAQ</span>
        </div>
        <div className="faq-rule" data-reveal />

        <div className="faq-head">
          <Heading data-reveal>{title}</Heading>
          <p data-reveal style={{ transitionDelay: "120ms" }}>
            {blurb}
          </p>
        </div>

        <div className="faq-grid">
          <Column items={left} offset={0} />
          <Column items={right} offset={1} />
        </div>

        {showAllLink && (
          <div className="faq-more" data-reveal>
            <Link href="/faq" className="faq-all">
              View all FAQs
              <ArrowRight size={18} strokeWidth={1.8} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
