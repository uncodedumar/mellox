"use client";

import type { MouseEvent } from "react";
import "./skip-link.css";

/**
 * "Skip to main content" link: the first thing a keyboard user reaches on every page.
 * It moves focus to the page's <main> when activated. (The work happens on click, not on page load, so it never edits
 * markup React is still hydrating.)
 */
export default function SkipLink() {
  const skip = (e: MouseEvent<HTMLAnchorElement>) => {
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return; // no <main> on this page: let the browser follow the link normally
    e.preventDefault();
    main.setAttribute("tabindex", "-1");
    main.style.outline = "none";
    main.focus();
    main.scrollIntoView({ block: "start" });
  };

  return (
    <a href="#main-content" onClick={skip} className="skip-link">
      Skip to main content
    </a>
  );
}
