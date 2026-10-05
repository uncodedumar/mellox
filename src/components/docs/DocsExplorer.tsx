"use client";

import { SearchX, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { DOC_FAQS, TOPICS } from "@/lib/docs";
import Faq from "../Faq";
import "./docs.css";

export default function DocsExplorer() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);

  const q = query.trim().toLowerCase();

  const topics = useMemo(
    () =>
      TOPICS.filter(
        (t) => !q || `${t.title} ${t.blurb} ${t.keywords}`.toLowerCase().includes(q),
      ),
    [q],
  );

  const faqs = useMemo(
    () =>
      DOC_FAQS.filter(
        (f) =>
          (!topic || f.topic === topic) &&
          (!q || `${f.q} ${f.a}`.toLowerCase().includes(q) || topics.some((t) => t.id === f.topic)),
      ),
    [q, topic, topics],
  );

  const activeTopic = TOPICS.find((t) => t.id === topic);
  const nothing = topics.length === 0 && faqs.length === 0;

  return (
    <>
      <section id="guides" className="px-section">
        <div className="px-inner">
          <form
            role="search"
            className="dx-search"
            onSubmit={(e) => e.preventDefault()}
            data-reveal
          >
            <Search size={20} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={'Search docs, try "Brand DNA" or "schedule a post"'}
              aria-label="Search docs and FAQs"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="dx-clear">
                <X size={18} aria-hidden="true" />
              </button>
            )}
          </form>

          <div className="dx-grid" aria-live="polite">
            {topics.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={topic === t.id}
                onClick={() => setTopic(topic === t.id ? null : t.id)}
                className={`px-card dx-card ${topic === t.id ? "on" : ""}`}
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <span className="dx-icn" style={{ background: t.color }}>
                  {t.n}
                </span>
                <h3>{t.title}</h3>
                <p>{t.blurb}</p>
                <span className="dx-hint">
                  {topic === t.id ? "Showing related questions" : "Show related questions"}
                </span>
              </button>
            ))}
          </div>

          {nothing && (
            <div className="dx-empty">
              <SearchX size={34} strokeWidth={1.4} aria-hidden="true" />
              <p>
                Nothing matches <b>&ldquo;{query}&rdquo;</b>. Try a shorter word, or{" "}
                <a href="mailto:support@mellox.ai">ask support</a>.
              </p>
            </div>
          )}
        </div>
      </section>

      {faqs.length > 0 && (
        <Faq
          key={`${q}|${topic}`}
          items={faqs}
          title={activeTopic ? `${activeTopic.title}: common questions` : "Frequently asked"}
          blurb={
            activeTopic || q
              ? "Showing the questions that match. Clear the filter to see them all."
              : "Quick answers on audits, approvals, teammates, clients and billing."
          }
        />
      )}
    </>
  );
}
