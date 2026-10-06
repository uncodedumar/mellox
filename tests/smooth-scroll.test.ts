import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { scrollToY, setSmoothScroll } from "@/lib/smooth-scroll";

const read = (...p: string[]) => readFileSync(path.join(process.cwd(), ...p), "utf8");

describe("smooth scroll wiring", () => {
  afterEach(() => setSmoothScroll(null));

  it("scrollToY hands the target to Lenis with a duration and an easing", () => {
    const scrollTo = vi.fn();
    setSmoothScroll({ scrollTo } as never);
    scrollToY(1200);
    expect(scrollTo).toHaveBeenCalledTimes(1);
    const [y, options] = scrollTo.mock.calls[0];
    expect(y).toBe(1200);
    expect(options.duration).toBeGreaterThan(0.5);
    expect(options.easing(0)).toBe(0);
    expect(options.easing(1)).toBe(1);
    expect(options.easing(0.5)).toBeGreaterThan(0.5); // ease-out: fast start, soft landing
  });

  it("scrollToY does not throw when Lenis is not running (reduced motion, server)", () => {
    expect(() => scrollToY(500)).not.toThrow();
  });

  it("is mounted once, in the root layout", () => {
    const layout = read("src", "app", "layout.tsx");
    expect(layout).toContain("<SmoothScroll />");
  });

  it("respects reduced motion, touch scrolling and the preloader scroll lock", () => {
    const src = read("src", "components", "SmoothScroll.tsx");
    expect(src).toContain("prefers-reduced-motion");
    expect(src).toMatch(/syncTouch:\s*false/);
    expect(src).toContain("mx-lock");
  });

  it("section buttons use the shared smooth scroll instead of the browser's own", () => {
    for (const f of ["Brains.tsx", "Workflow.tsx"]) {
      const src = read("src", "components", f);
      expect(src, f).toContain("scrollToY(");
      expect(src, f).not.toMatch(/behavior:\s*"smooth"/);
    }
  });

  it("scrollable panels opt out of the smooth wheel", () => {
    expect(read("src", "components", "Navbar.tsx")).toContain("data-lenis-prevent");
    expect(read("src", "components", "legal", "CookieBanner.tsx")).toContain("data-lenis-prevent");
    expect(read("src", "components", "legal", "LegalPage.tsx")).toContain("data-lenis-prevent");
  });
});
