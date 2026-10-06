"use client";

import { useEffect, useState } from "react";
import { prefersStaticMotion } from "@/lib/motion";

/** Each headline is two lines: a plain line and an accent line. The first one is also the page's real <h1> text. */
const HEADLINES: readonly [string, string][] = [
  ["Don’t just rank.", "Be recommended."],
  ["Don’t just post.", "Own the feed."],
  ["Don’t just juggle.", "Multiply."],
];

const TYPE_MS = 52; // per character while typing
const ERASE_MS = 24; // per character while deleting (faster than typing, like a real backspace)
const LINE_GAP_MS = 220; // pause between the two lines
const HOLD_MS = 2800; // how long a finished headline stays up
const FIRST_HOLD_MS = 3600; // the first headline is the page's main message: give it longer before the cycle starts
const NEXT_GAP_MS = 320;

/**
 * Hero headline that types itself out, holds, deletes, and moves to the next line of the pitch.
 *
 * - The server renders the first headline in full, so the page is complete without JavaScript (SEO, first paint, no
 *   layout shift) and a screen reader always gets one stable heading.
 * - Touch-first devices and reduced-motion visitors keep that first headline, static. Nothing animates.
 * - Each line reserves its height, so the page below never jumps while text appears and disappears.
 */
export default function HeroHeadline() {
  const [index, setIndex] = useState(0);
  const [counts, setCounts] = useState<[number, number]>([HEADLINES[0][0].length, HEADLINES[0][1].length]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (prefersStaticMotion()) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, ms);
      });

    const run = async () => {
      let i = 0;
      await wait(FIRST_HOLD_MS);
      while (!cancelled) {
        const [a, b] = HEADLINES[i];
        setAnimating(true);

        // delete: second line first, then the first
        for (let n = b.length; n >= 0 && !cancelled; n--) {
          setCounts([a.length, n]);
          await wait(ERASE_MS);
        }
        for (let n = a.length; n >= 0 && !cancelled; n--) {
          setCounts([n, 0]);
          await wait(ERASE_MS);
        }
        if (cancelled) return;
        await wait(NEXT_GAP_MS);

        // type the next headline
        i = (i + 1) % HEADLINES.length;
        setIndex(i);
        const [na, nb] = HEADLINES[i];
        for (let n = 1; n <= na.length && !cancelled; n++) {
          setCounts([n, 0]);
          await wait(TYPE_MS);
        }
        await wait(LINE_GAP_MS);
        for (let n = 1; n <= nb.length && !cancelled; n++) {
          setCounts([na.length, n]);
          await wait(TYPE_MS);
        }
        setAnimating(false);
        await wait(HOLD_MS);
      }
    };
    void run();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const [line1, line2] = HEADLINES[index];
  const [c1, c2] = counts;
  // the caret sits at the end of whichever line is being written; once finished it stays on the accent line
  const caretOnFirst = animating && c2 === 0;

  return (
    <h1 className="mt-7 max-w-5xl text-center text-[clamp(2.1rem,5.2vw,4.35rem)] font-semibold leading-[1.03] tracking-[-0.035em]">
      {/* the stable heading for crawlers and screen readers; the animated copy below is decoration */}
      <span className="sr-only">{HEADLINES[0][0]} {HEADLINES[0][1]}</span>
      <span aria-hidden="true" className="block">
        <span className="hero-hl-line">
          {line1.slice(0, c1)}
          {caretOnFirst && <span className="hero-caret" />}
        </span>
        <span className="hero-hl-line hero-headline-accent">
          {line2.slice(0, c2)}
          {!caretOnFirst && animating && <span className="hero-caret" />}
        </span>
      </span>
    </h1>
  );
}
