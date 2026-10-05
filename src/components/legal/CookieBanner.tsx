"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { OPEN_EVENT, getServerSnapshot, getSnapshot, saveConsent, subscribe } from "@/lib/consent";
import "./cookie-banner.css";

const CATEGORIES = [
  {
    key: "essential",
    title: "Essential",
    text: "Keep you signed in, remember your choices and keep the site secure. Always on.",
  },
  {
    key: "analytics",
    title: "Analytics",
    text: "Help us understand which pages and features are used so we can improve Mellox.",
  },
  {
    key: "marketing",
    title: "Marketing",
    text: "Let us measure our own campaigns and show relevant Mellox messages elsewhere.",
  },
] as const;

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [panel, setPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // reopen from the footer link or the cookie policy page
  useEffect(() => {
    const open = () => {
      const c = getSnapshot();
      setAnalytics(!!c?.analytics);
      setMarketing(!!c?.marketing);
      setPanel(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const prev = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPanel(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [panel]);

  const choose = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m });
    setPanel(false);
  };

  const showBanner = consent === null && !panel; // undefined while hydrating: render nothing

  return (
    <>
      {showBanner && (
        <div className="ck-banner" role="region" aria-label="Cookie consent">
          <div className="ck-text">
            <b>We value your privacy</b>
            <p>
              We use essential cookies to make Mellox work. With your permission we may also use analytics and
              marketing cookies. Read our <Link href="/cookies">Cookie Policy</Link>.
            </p>
          </div>
          <div className="ck-actions">
            <button type="button" className="ck-btn ghost" onClick={() => setPanel(true)}>
              Customize
            </button>
            <button type="button" className="ck-btn" onClick={() => choose(false, false)}>
              Reject non-essential
            </button>
            <button type="button" className="ck-btn lime" onClick={() => choose(true, true)}>
              Accept all
            </button>
          </div>
        </div>
      )}

      {panel && (
        <div className="ck-overlay" onMouseDown={(e) => e.target === e.currentTarget && setPanel(false)}>
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ck-title"
            className="ck-dialog"
          >
            <h2 id="ck-title">Cookie preferences</h2>
            <p className="ck-lede">
              Choose which cookies Mellox may use. You can change this at any time from the footer.{" "}
              <Link href="/cookies" onClick={() => setPanel(false)}>
                Cookie Policy
              </Link>
            </p>
            <ul>
              {CATEGORIES.map((c) => {
                const on = c.key === "essential" ? true : c.key === "analytics" ? analytics : marketing;
                return (
                  <li key={c.key}>
                    <div>
                      <b>{c.title}</b>
                      <span>{c.text}</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-label={`${c.title} cookies`}
                      disabled={c.key === "essential"}
                      className="ck-switch"
                      onClick={() => (c.key === "analytics" ? setAnalytics(!analytics) : setMarketing(!marketing))}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="ck-actions">
              <button type="button" className="ck-btn" onClick={() => choose(false, false)}>
                Reject non-essential
              </button>
              <button type="button" className="ck-btn" onClick={() => choose(analytics, marketing)}>
                Save choices
              </button>
              <button type="button" className="ck-btn lime" onClick={() => choose(true, true)}>
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
