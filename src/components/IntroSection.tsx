"use client";

import { useEffect, useRef } from "react";
import "./intro.css";
import "./skip-link.css";
import { prefersStaticMotion } from "@/lib/motion";

const TEXT =
  "We help enterprises reimagine business growth with our AI Platform, Work Solutions, and Intelligent Marketplace. Unlock efficiency, automation, and innovation across every workflow.";

const words = TEXT.split(" ");

const llms: { name: string; icon: string }[] = [
  { name: "ChatGPT", icon: "openai" },
  { name: "Google Gemini", icon: "gemini" },
  { name: "Claude", icon: "claude" },
  { name: "Microsoft Copilot", icon: "copilot" },
  { name: "Meta AI", icon: "meta" },
  { name: "Perplexity", icon: "perplexity" },
  { name: "DeepSeek", icon: "deepseek" },
  { name: "Grok", icon: "grok" },
  { name: "Dola AI", icon: "doubao" },
  { name: "Pi", icon: "inflection" },
];

const socials: { name: string; icon: string }[] = [
  { name: "Facebook", icon: "facebook" },
  { name: "Instagram", icon: "instagram" },
  { name: "YouTube", icon: "youtube" },
  { name: "Reddit", icon: "reddit" },
  { name: "LinkedIn", icon: "linkedin" },
  { name: "Pinterest", icon: "pinterest" },
  { name: "TikTok", icon: "tiktok" },
  { name: "X (Twitter)", icon: "x" },
  { name: "Threads", icon: "threads" },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => t * t * (3 - 2 * t);

/**
 * Pinned section driven by vertical scroll:
 *  1. the paragraph lights up word by word,
 *  2. the track slides sideways: the colour field travels from the right edge to the centre and turns green,
 *  3. "Built to be cited by" rises in, followed by a timeline of the LLM logos.
 * Everything is written straight to transform/opacity from one rAF-throttled scroll handler.
 */
export default function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const multiRef = useRef<HTMLDivElement>(null);
  const greenRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const headRef = useRef<HTMLHeadingElement>(null);
  const head2Ref = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLLIElement | null)[]>([]);
  const discRef = useRef<HTMLDivElement>(null);
  const toneRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const reduce = prefersStaticMotion();

    // Reduced motion: no pinned, scroll-driven sequence. Show everything at once as normal flowing content.
    if (reduce) {
      section.classList.add("intro-static");
      wordRefs.current.forEach((el) => el && (el.style.opacity = "1"));
      [headRef.current, head2Ref.current, outroRef.current].forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "none";
        }
      });
      nodeRefs.current.forEach((li) => {
        li?.style.setProperty("--r", "1");
        li?.style.setProperty("--s", "1");
      });
      return;
    }

    let revealPx = 0;
    let travel = 0;
    let floodPx = 0;
    let holdPx = 0;
    let sizeKey = "";
    let raf = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      sizeKey = `${vw}x${vh}x${track.scrollWidth}`;
      revealPx = vh * 1.1;
      // slide until the very last app logo has left the screen (not just until the track ends)
      const last = nodeRefs.current[nodeRefs.current.length - 1];
      const lastRight = last ? last.getBoundingClientRect().right - track.getBoundingClientRect().left : track.scrollWidth;
      travel = Math.max(0, lastRight + vw * 0.04);
      floodPx = vh * 0.9; // colour floods the screen
      holdPx = vh * 0.55; // "Mellox does it all." holds before the next section arrives
      section.style.height = `${vh + revealPx + travel + floodPx + holdPx}px`;
    };

    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      if (sizeKey !== `${vw}x${window.innerHeight}x${track.scrollWidth}`) measure();
      const top = section.getBoundingClientRect().top;
      const scrolled = clamp(-top, 0, revealPx + travel + floodPx + holdPx);

      // 1) word reveal
      const p1 = reduce ? 1 : clamp(scrolled / revealPx);
      const lead = p1 * (words.length + 4);
      wordRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(0.18 + 0.82 * clamp(lead - i));
      });

      // 2) horizontal travel
      const p2 = travel ? clamp((scrolled - revealPx) / travel) : 0;
      track.style.transform = `translate3d(${-p2 * travel}px,0,0)`;

      // colour field: right edge -> centre, multicolour -> green
      const e = ease(clamp(p2 / 0.45));
      const field = fieldRef.current;
      // the field now stays centred until the logos are gone (no sliding off to the left)
      if (field) field.style.left = `${100 - 50 * e}%`;
      if (multiRef.current) multiRef.current.style.opacity = String(1 - e);
      if (greenRef.current) greenRef.current.style.opacity = String(e);

      // 3) heading rises and logo nodes draw in as they enter from the right
      const rise = (el: HTMLElement | null) => {
        if (!el) return 0;
        const x = el.getBoundingClientRect().left;
        const r = clamp((vw * 0.98 - x) / (vw * 0.4));
        el.style.opacity = String(r);
        el.style.transform = `translate3d(0,${(1 - ease(r)) * 90}px,0)`;
        return x;
      };
      rise(headRef.current);
      const x2 = rise(head2Ref.current);

      // when the social row arrives, the glow and background drift from green to teal-blue
      const shift = ease(clamp((vw * 0.75 - x2) / (vw * 0.55)));
      if (fieldRef.current) fieldRef.current.style.filter = `hue-rotate(${shift * 72}deg) saturate(${1 + shift * 0.15})`;
      if (stageRef.current) {
        const mix = (a: number, b: number) => Math.round(a + (b - a) * shift);
        stageRef.current.style.backgroundColor = `rgb(${mix(3, 2)},${mix(4, 13)},${mix(5, 22)})`;
      }
      // 4) flood: the field swells until it fills the screen, then settles into the next section's colour
      //    while the outro line appears
      const p3 = floodPx ? clamp((scrolled - revealPx - travel) / floodPx) : 0;
      const grow = ease(clamp(p3 / 0.62));
      if (discRef.current) {
        discRef.current.style.opacity = String(clamp(p3 * 8));
        discRef.current.style.transform = `translate3d(0,0,0) scale(${0.03 + 0.97 * grow})`;
      }
      if (fieldRef.current) fieldRef.current.style.opacity = String(1 - 0.85 * grow);
      if (toneRef.current) toneRef.current.style.opacity = String(ease(clamp((p3 - 0.55) / 0.45)));
      if (outroRef.current) {
        const t = ease(clamp((p3 - 0.6) / 0.4));
        outroRef.current.style.opacity = String(t);
        outroRef.current.style.transform = `translate3d(0,${(1 - t) * 60}px,0)`;
      }
      nodeRefs.current.forEach((li) => {
        if (!li) return;
        const x = li.getBoundingClientRect().left;
        li.style.setProperty("--r", String(clamp((vw * 0.94 - x) / (vw * 0.14))));
        const cx = x + li.offsetWidth / 2;
        const d = clamp(Math.abs(cx - vw / 2) / (vw * 0.2));
        li.style.setProperty("--s", String(1 + 0.55 * (1 - ease(d))));
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(track);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
    <section id="about" ref={sectionRef} className="intro relative z-[1]" aria-label="What Mellox does">
      <a href="#after-intro" className="skip-link">
        Skip this animated section
      </a>
      <div ref={stageRef} className="intro-stage sticky top-0 h-[100svh] overflow-hidden">
        <div className="grain-tex pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* colour field (outside the track so it can glide to the centre) */}
        <div ref={fieldRef} className="color-field" aria-hidden="true">
          <div ref={multiRef} className="field-layer">
            <span className="blob b1" />
            <span className="blob b2" />
            <span className="blob b3" />
            <span className="blob b4" />
            <span className="blob b5" />
          </div>
          <div ref={greenRef} className="field-layer" style={{ opacity: 0 }}>
            <span className="blob g1" />
            <span className="blob g2" />
            <span className="blob g3" />
            <span className="blob g4" />
            <span className="blob g5" />
          </div>
          <span className="grain" />
        </div>

        <div
          ref={trackRef}
          className="intro-track relative z-10 flex h-full w-max items-center will-change-transform"
        >
          {/* Panel A: paragraph */}
          <div className="flex h-full w-screen shrink-0 items-center px-6 sm:px-10 lg:px-14">
            <p className="max-w-[min(100%,1000px)] text-[clamp(1.5rem,3.1vw,2.75rem)] font-normal leading-[1.15] tracking-[-0.025em] text-white">
              {words.map((w, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className="inline-block will-change-[opacity]"
                  style={{ opacity: 0.18, marginRight: "0.26em" }}
                >
                  {w}
                </span>
              ))}
            </p>
          </div>

          {/* Panel B: heading + timeline */}
          <div className="flex h-full shrink-0 items-center pl-[8vw] pr-[18vw]">
            <div className="intro-group contents">
            <h2
              ref={headRef}
              className="w-[min(78vw,640px)] shrink-0 text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
              style={{ opacity: 0 }}
            >
              Built to be cited by
            </h2>

            <ol className="relative ml-[4vw] flex items-start">
              {llms.map((l, i) => (
                <li
                  key={l.name}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="timeline-node"
                >
                  <span className="timeline-seg" aria-hidden="true" />
                  <span className="timeline-dot glass">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="timeline-icon" src={`/llms/${l.icon}.svg`} alt="" />
                  </span>
                  <span className="sr-only">{l.name}</span>
                </li>
              ))}
            </ol>
            </div>

            <div className="intro-group contents">
            <h2
              ref={head2Ref}
              className="ml-[10vw] w-[min(78vw,640px)] shrink-0 text-[clamp(2rem,5vw,4.5rem)] font-normal leading-[1.05] tracking-[-0.03em] text-white"
              style={{ opacity: 0 }}
            >
              Publishes natively to
            </h2>

            <ol className="relative ml-[4vw] flex items-start">
              {socials.map((l, i) => (
                <li
                  key={l.name}
                  ref={(el) => {
                    nodeRefs.current[llms.length + i] = el;
                  }}
                  className="timeline-node"
                >
                  <span className="timeline-seg" aria-hidden="true" />
                  <span className="timeline-dot glass">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="timeline-icon" src={`/llms/${l.icon}.svg`} alt="" />
                  </span>
                  <span className="sr-only">{l.name}</span>
                </li>
              ))}
            </ol>
            </div>
          </div>
        </div>

        {/* flood + outro */}
        <div ref={discRef} className="intro-disc" aria-hidden="true" style={{ opacity: 0 }} />
        <div ref={toneRef} className="intro-tone" aria-hidden="true" style={{ opacity: 0 }} />
        <div ref={outroRef} className="intro-outro" style={{ opacity: 0 }}>
          <h2>
            Mellox does <span>it all.</span>
          </h2>
          <p>Research, create, publish and track, all from one place.</p>
        </div>
      </div>
    </section>
    <span id="after-intro" tabIndex={-1} />
    </>
  );
}
