"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { OPEN_EVENT, getServerSnapshot, getSnapshot, saveConsent, subscribe } from "@/lib/consent";
import "./cookie-banner.css";

// One simple choice, no per-category switches: accept everything or reject everything non-essential.
export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [reopened, setReopened] = useState(false);

  // reopen from the footer link or the cookie policy page
  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  useEffect(() => {
    if (!reopened) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setReopened(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [reopened]);

  const choose = (all: boolean) => {
    saveConsent({ analytics: all, marketing: all });
    setReopened(false);
  };

  // consent is undefined while hydrating: render nothing
  if (consent === undefined || (consent !== null && !reopened)) return null;

  return (
    <div className="ck-banner" role="region" aria-label="Cookie consent">
      <div className="ck-text">
        <b>We value your privacy</b>
        <p>
          We use essential cookies to make Mellox work. With your permission we may also use analytics and marketing
          cookies. Read our <Link href="/cookies">Cookie Policy</Link>.
        </p>
      </div>
      <div className="ck-actions">
        <button type="button" className="ck-btn" onClick={() => choose(false)}>
          Reject non-essential
        </button>
        <button type="button" className="ck-btn lime" onClick={() => choose(true)}>
          Accept all
        </button>
      </div>
    </div>
  );
}
