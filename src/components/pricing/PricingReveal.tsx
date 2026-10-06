"use client";

import { useEffect } from "react";

/** Fades `[data-reveal]` elements in as they scroll into view (scoped to `.px`). */
export default function PricingReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".px [data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }),
      // Any part entering the viewport counts, with a small inset so cards fade in a little after they appear.
      // (A ratio threshold never fires for very tall elements, such as a long legal document.)
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return null;
}
