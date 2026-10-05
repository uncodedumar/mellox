"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor light + parallax for the hero background.
 *
 * Renders the glow element and drives it (and every `[data-depth]` sibling
 * layer) with `transform` only, so nothing repaints or restyles per frame.
 * Easing is time-based (exponential), so it feels identical at 60/120/144 Hz.
 */
export default function HeroPointer() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spot = spotRef.current;
    const root = spot?.parentElement;
    if (!spot || !root) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
      el,
      depth: Number(el.dataset.depth) || 0,
    }));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let size = 0;
    const measure = () => {
      const r = root.getBoundingClientRect();
      w = r.width;
      h = r.height;
      size = Math.max(420, w * 0.42);
      spot.style.width = spot.style.height = `${size}px`;
    };
    measure();

    // target / current pointer position in px (relative to the hero) and presence 0-1
    const t = { x: w / 2, y: h / 2, k: 0 };
    const c = { x: w / 2, y: h / 2, k: 0 };
    let px = 0; // eased parallax offsets, -0.5..0.5
    let py = 0;
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const follow = 1 - Math.exp(-dt / 0.09); // glow follows with ~90ms time-constant
      const fade = 1 - Math.exp(-dt / 0.22);
      const drift = 1 - Math.exp(-dt / 0.35); // parallax is lazier than the glow

      c.x += (t.x - c.x) * follow;
      c.y += (t.y - c.y) * follow;
      c.k += (t.k - c.k) * fade;

      spot.style.transform = `translate3d(${c.x - size / 2}px, ${c.y - size / 2}px, 0)`;
      spot.style.opacity = c.k.toFixed(3);

      if (!reduce) {
        px += (((c.x / w) - 0.5) * (t.k ? 1 : 0) - px) * drift;
        py += (((c.y / h) - 0.5) * (t.k ? 1 : 0) - py) * drift;
        for (const l of layers) {
          l.el.style.transform = `translate3d(${(-px * l.depth).toFixed(2)}px, ${(-py * l.depth * 0.6).toFixed(2)}px, 0)`;
        }
      }

      // keep running while the pointer is inside; stop once everything has eased back to rest
      const resting = t.k === 0 && c.k < 0.002 && Math.abs(px) < 0.002 && Math.abs(py) < 0.002;
      raf = resting ? 0 : requestAnimationFrame(frame);
    };

    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = root.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (inside) {
        // first entry: start from the pointer so the glow doesn't sweep in from the centre
        if (t.k === 0 && c.k < 0.01) {
          c.x = e.clientX - r.left;
          c.y = e.clientY - r.top;
        }
        t.x = e.clientX - r.left;
        t.y = e.clientY - r.top;
        t.k = 1;
      } else {
        t.k = 0;
      }
      kick();
    };
    const onLeave = () => {
      t.k = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", measure);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", measure);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={spotRef} className="hero-spot" />;
}
