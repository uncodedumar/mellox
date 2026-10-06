"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Dashboard shot as a translucent glass panel.
 *  - Scroll reveal: it starts tilted back and dim, then flattens, scales up and
 *    becomes more opaque as it scrolls into view (--rv, 0..1, eased).
 *  - Hover: a soft circle of full opacity follows the cursor (--dx/--dy/--dk).
 * All values are eased with time-based smoothing in a single rAF loop that
 * sleeps when nothing is moving.
 */
export default function HeroDash() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const slot = el?.parentElement; // untransformed wrapper, used to measure scroll progress
    if (!el || !slot) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const t = { x: 0, y: 0, k: 0, p: 0 };
    const c = { x: 0, y: 0, k: 0, p: 0 };
    let raf = 0;
    let last = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const top = slot.getBoundingClientRect().top;
      // 0 when the panel's top is near the bottom of the screen, 1 once it has risen to ~30% down
      t.p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.95 - top) / (vh * 0.65)));
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const follow = 1 - Math.exp(-dt / 0.08);
      const fade = 1 - Math.exp(-dt / 0.18);
      const reveal = 1 - Math.exp(-dt / 0.14);

      c.x += (t.x - c.x) * follow;
      c.y += (t.y - c.y) * follow;
      c.k += (t.k - c.k) * fade;
      c.p += (t.p - c.p) * reveal;

      el.style.setProperty("--dx", `${c.x.toFixed(1)}px`);
      el.style.setProperty("--dy", `${c.y.toFixed(1)}px`);
      el.style.setProperty("--dk", c.k.toFixed(3));
      el.style.setProperty("--rv", c.p.toFixed(4));

      const resting = t.k === 0 && c.k < 0.004 && Math.abs(t.p - c.p) < 0.0005;
      raf = resting ? 0 : requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onScroll = () => {
      measure();
      kick();
    };

    // offsetX/Y are in the panel's own (untilted) coordinates, so the circle stays under the cursor mid-tilt
    const onMove = (e: PointerEvent) => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (t.k === 0 && c.k < 0.01) {
        c.x = x;
        c.y = y;
      }
      t.x = x;
      t.y = y;
      t.k = 1;
      kick();
    };
    const onLeave = () => {
      t.k = 0;
      kick();
    };

    measure();
    c.p = t.p;
    el.style.setProperty("--rv", c.p.toFixed(4));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="hero-dash relative">
      <Image
        src="/Home/Hero.webp"
        alt="Mellox AI workspace: Good afternoon, what should we work on today?"
        width={1917}
        height={1078}
        priority
        sizes="(min-width: 1100px) 1040px, 92vw"
        className="hero-dash-base"
      />
      {/* same shot at full strength, revealed only inside the cursor circle */}
      <Image
        src="/Home/Hero.webp"
        alt=""
        aria-hidden
        width={1917}
        height={1078}
        sizes="(min-width: 1100px) 1040px, 92vw"
        className="hero-dash-lit"
      />
    </div>
  );
}
