"use client";

import "lenis/dist/lenis.css";
import { useEffect } from "react";
import { isTouchFirst } from "@/lib/motion";
import { setSmoothScroll } from "@/lib/smooth-scroll";

/**
 * Site-wide smooth scrolling (Lenis).
 *
 * - It keeps the browser's real scroll position, so every scroll-driven section (pinned intro, brains, workflow,
 *   dashboard tilt) keeps working unchanged, just fed with smoother values.
 * - Touch devices keep their native, momentum-based scrolling (it is already smooth and feels right under the finger).
 * - Off for visitors who prefer reduced motion.
 * - Paused while the intro preloader holds the page (`html.mx-lock`).
 * - Scrollable panels (mobile menu, cookie dialog, contents list) opt out with `data-lenis-prevent`.
 * - Performance: the library is not part of the initial JavaScript. It is fetched and started when the browser is idle,
 *   and never on touch devices, which do not use it.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    // touch / coarse pointers keep native scrolling, so do not even download the library
    if (isTouchFirst()) return;

    let disposed = false;
    let teardown: (() => void) | undefined;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (disposed) return;

      const lenis = new Lenis({
        lerp: 0.075, // inertia: how quickly the page catches up with the wheel. Lower = heavier, longer glide
        wheelMultiplier: 0.9, // each wheel notch moves a little less, so momentum (not distance) does the work
        smoothWheel: true,
        syncTouch: false, // keep native touch scrolling
        anchors: true, // #links glide instead of jumping
      });
      setSmoothScroll(lenis);

      let raf = 0;
      const tick = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      // the preloader (and any future modal) locks scrolling by adding `mx-lock` to <html>
      const root = document.documentElement;
      const syncLock = () => (root.classList.contains("mx-lock") ? lenis.stop() : lenis.start());
      const observer = new MutationObserver(syncLock);
      observer.observe(root, { attributes: true, attributeFilter: ["class"] });
      syncLock();

      // if the visitor turns on reduced motion while the page is open, hand scrolling back to the browser
      const onReduce = () => {
        if (reduce.matches) lenis.destroy();
      };
      reduce.addEventListener("change", onReduce);

      teardown = () => {
        reduce.removeEventListener("change", onReduce);
        observer.disconnect();
        cancelAnimationFrame(raf);
        setSmoothScroll(null);
        lenis.destroy();
      };
    };

    // wait for the page to settle before downloading and starting the library
    let idleId = 0;
    let timer = 0;
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => void start(), { timeout: 2500 });
      } else {
        timer = window.setTimeout(() => void start(), 800);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      disposed = true;
      window.removeEventListener("load", schedule);
      if (idleId) window.cancelIdleCallback(idleId);
      if (timer) clearTimeout(timer);
      teardown?.();
    };
  }, []);

  return null;
}
