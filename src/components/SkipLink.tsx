"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./skip-link.css";

/**
 * "Skip to main content" link: the first thing a keyboard user reaches on every page.
 * Pages already render a <main>; this gives it the id the link points to and makes it focusable on activation.
 */
export default function SkipLink() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.querySelector("main");
    if (main) {
      main.id = "main-content";
      main.setAttribute("tabindex", "-1");
      main.style.outline = "none";
    }
  }, [pathname]);

  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}
