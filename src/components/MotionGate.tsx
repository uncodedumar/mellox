"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps ambient animation off the critical path.
 *
 * - `html.mx-live` is added only after the page has loaded, the intro preloader (`html.mx-lock`) has finished and the
 *   browser is idle. Until then the CSS keeps the hero's ~200 animated streaks and stars frozen, so they do not compete
 *   with parsing, hydration and the first paint.
 * - The hero backdrop is paused whenever it is scrolled out of view (`.is-offscreen`).
 */
export default function MotionGate() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const cleanups: Array<() => void> = [];
    let alive = true;

    const goLive = () => {
      if (alive) root.classList.add("mx-live");
    };

    const whenUnlocked = () => {
      if (!root.classList.contains("mx-lock")) return goLive();
      const mo = new MutationObserver(() => {
        if (!root.classList.contains("mx-lock")) {
          mo.disconnect();
          goLive();
        }
      });
      mo.observe(root, { attributes: true, attributeFilter: ["class"] });
      cleanups.push(() => mo.disconnect());
    };

    const afterLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        const id = window.requestIdleCallback(whenUnlocked, { timeout: 1500 });
        cleanups.push(() => window.cancelIdleCallback(id));
      } else {
        const t = window.setTimeout(whenUnlocked, 200);
        cleanups.push(() => clearTimeout(t));
      }
    };

    if (root.classList.contains("mx-live")) {
      /* already live from an earlier page of this visit */
    } else if (document.readyState === "complete") {
      afterLoad();
    } else {
      window.addEventListener("load", afterLoad, { once: true });
      cleanups.push(() => window.removeEventListener("load", afterLoad));
    }

    // pause the hero backdrop while it is off screen
    const hero = document.querySelector<HTMLElement>(".hero-bg");
    if (hero && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(([entry]) => hero.classList.toggle("is-offscreen", !entry.isIntersecting), {
        rootMargin: "80px",
      });
      io.observe(hero);
      cleanups.push(() => io.disconnect());
    }

    return () => {
      alive = false;
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
