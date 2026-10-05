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
      { threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return null;
}
