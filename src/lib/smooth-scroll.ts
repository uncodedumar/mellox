import type Lenis from "lenis";

// Shared handle to the page's smooth-scroll engine (Lenis), so any component can scroll the page in the same smooth way.
// <SmoothScroll /> registers it. When it is not running (reduced motion, before hydration), these fall back to the browser.

let instance: Lenis | null = null;

export function setSmoothScroll(lenis: Lenis | null) {
  instance = lenis;
}

export function getSmoothScroll() {
  return instance;
}

/** Soft ease-out used for programmatic jumps (anchor links, "go to section" buttons). */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Scrolls the page to an absolute y position, smoothly. */
export function scrollToY(y: number, duration = 1.3) {
  if (instance) {
    instance.scrollTo(y, { duration, easing: easeOutExpo });
  } else if (typeof window !== "undefined") {
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}
