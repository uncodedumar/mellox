"use client";

import { useEffect, useRef, useState } from "react";
import "./preloader.css";

const MARK_PATH = "M351.833 230.931C354.699 228.573 358.737 228.268 361.925 230.168C365.573 232.343 367.146 236.815 365.662 240.795L356.61 265.077L317.897 370.654L375.883 316.129C376.769 315.296 377.928 314.814 379.143 314.774L488.638 311.17C492.829 311.032 496.697 313.408 498.468 317.209C500.533 321.641 499.254 326.913 495.387 329.906L406.294 398.844C399.461 404.131 391.066 407 382.427 407H356.61L424.574 357.673L302.539 405.273C299.76 406.356 296.629 406.028 294.136 404.393C290.645 402.103 289.131 397.753 290.444 393.79L317.897 310.942L258.718 404.669C257.802 406.12 256.206 407 254.49 407H160.619C157.172 407 154.096 404.834 152.934 401.588C151.774 398.345 152.774 394.723 155.433 392.535L351.833 230.931Z";
const STORAGE_KEY = "mx-preloaded";
const MIN_MS = 1500; // shortest time the intro stays up, so the animation always finishes
const MAX_MS = 5000; // never hold the site hostage on a slow connection
const EXIT_MS = 1100;

/**
 * Branded intro, shown once per browser session (first page of the visit only).
 * - The pre-hydration script in layout.tsx hides it instantly for returning visitors (no flash).
 * - <noscript> hides it when JavaScript is off, so content is never blocked.
 * - Reduced motion gets a quick, calm fade instead of the full sequence.
 */
export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const pctRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    // Returning visitor: the head script already set data-preloaded, and CSS hides the overlay.
    if (root.hasAttribute("data-preloaded")) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduce ? 500 : MIN_MS;
    root.classList.add("mx-lock");

    const start = performance.now();
    let ready = document.readyState === "complete";
    let fontsReady = false;
    let raf = 0;
    let finished = false;
    const timers: number[] = [];

    const onLoad = () => {
      ready = true;
    };
    if (!ready) window.addEventListener("load", onLoad, { once: true });
    document.fonts?.ready.then(() => {
      fontsReady = true;
    });
    if (!document.fonts) fontsReady = true;

    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      timers.push(
        window.setTimeout(() => {
          root.classList.remove("mx-lock");
          root.setAttribute("data-preloaded", "1");
          setMounted(false);
        }, reduce ? 450 : EXIT_MS),
      );
    };

    const tick = (now: number) => {
      const elapsed = now - start;
      const loaded = ready && fontsReady;
      // glide toward 88% while things load, then to 100% once ready and the minimum time has passed
      const timeTarget = Math.min(100, (elapsed / minMs) * 100);
      const target = loaded ? Math.min(100, timeTarget) : Math.min(88, timeTarget);
      pctRef.current += (target - pctRef.current) * 0.12;
      const shown = Math.min(100, Math.round(pctRef.current));
      setPct((p) => (p === shown ? p : shown));

      if ((loaded && elapsed >= minMs && pctRef.current > 99) || elapsed >= MAX_MS) {
        pctRef.current = 100;
        setPct(100);
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // safety net that does not depend on animation frames (throttled in background tabs)
    timers.push(window.setTimeout(finish, MAX_MS + 400));

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("load", onLoad);
      root.classList.remove("mx-lock");
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`mx-pre ${done ? "is-done" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={done ? "Mellox is ready" : "Loading Mellox"}
    >
      <div className="mx-pre-panel mx-pre-top" aria-hidden="true" />
      <div className="mx-pre-panel mx-pre-bot" aria-hidden="true" />

      <div className="mx-pre-content">
        {/* colour field behind the mark */}
        <div className="mx-pre-field" aria-hidden="true">
          <span className="b b1" />
          <span className="b b2" />
          <span className="b b3" />
          <span className="b b4" />
          <span className="b b5" />
        </div>
        <div className="grain-tex mx-pre-grain" aria-hidden="true" />

        <div className="mx-pre-center">
          <div className="mx-pre-mark" aria-hidden="true">
            <span className="ring" />
            <span className="ring ring-2" />
            <svg viewBox="150 226 352 184" fill="none">
              <path className="outline" d={MARK_PATH} pathLength={1} />
              <path className="fill" d={MARK_PATH} />
            </svg>
          </div>

          <div className="mx-pre-word" aria-hidden="true">
            {"MELLOX".split("").map((ch, i) => (
              <span key={i} style={{ animationDelay: `${0.7 + i * 0.07}s` }}>
                {ch}
              </span>
            ))}
          </div>
          <p className="mx-pre-tag" aria-hidden="true">
            Don&apos;t just rank. <b>Be recommended.</b>
          </p>
        </div>

        <div className="mx-pre-foot" aria-hidden="true">
          <span className="mx-pre-count">
            {String(pct).padStart(3, "0")}
            <i>%</i>
          </span>
          <span className="mx-pre-bar">
            <span style={{ transform: `scaleX(${pct / 100})` }} />
          </span>
        </div>
      </div>
    </div>
  );
}
