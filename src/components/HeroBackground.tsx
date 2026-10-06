import "./hero-background.css";

/**
 * Hero backdrop: lime (#CBE960) aurora curtains rising over a dark slate sky, with
 * purple / blue / orange / red accents at the tips, stars and film grain.
 *
 * Performance notes: every moving layer animates only `transform` / `opacity`
 * (compositor-only) and blurs are static, so motion and hover stay smooth.
 * Server-rendered; it is a pure server component.
 */

// Deterministic PRNG so the layout is identical on every render.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/** Accent colour at the tip of a streak: orange far left, blue far right, purple/blue between. */
function accent(t: number, rand: number) {
  if (t < 0.18) return rand < 0.6 ? "var(--brain-orange)" : "var(--brain-red)";
  if (t > 0.82) return rand < 0.7 ? "var(--brain-blue)" : "var(--brain-purple)";
  return rand < 0.7 ? "var(--brain-purple)" : rand < 0.9 ? "var(--brain-blue)" : "var(--brain-red)";
}

function buildStreaks() {
  const rand = mulberry32(11);
  const count = 44;
  return Array.from({ length: count }, (_, i) => {
    const t = (i + rand()) / count;
    // wavy crest line so the tops read as aurora curtains rather than bars
    const wave = 0.5 + 0.28 * Math.sin(t * 9 + 0.8) + 0.16 * Math.sin(t * 21 + 2.1);
    const height = (34 + 50 * wave) * (0.78 + 0.22 * rand());
    return {
      left: r2(t * 100),
      width: r2(1.1 + rand() * 3.4), // vw
      height: r2(height),
      blur: r2(5 + rand() * 12),
      opacity: r2((0.3 + 0.55 * wave) * (0.55 + 0.45 * rand())),
      accent: accent(t, rand()),
      dur: r2(6 + rand() * 8),
      delay: r2(-rand() * 14),
      sway: r2((rand() - 0.5) * 3.4),
    };
  });
}

function buildStars() {
  const rand = mulberry32(42);
  return Array.from({ length: 90 }, (_, i) => ({
    x: r2(rand() * 100),
    y: r2(rand() * 80),
    r: r2(0.5 + rand() * 1.1),
    o: r2(0.25 + rand() * 0.6),
    twinkle: i % 4 === 0, // only some stars animate
    d: r2(2 + rand() * 4),
    w: r2(-rand() * 6),
  }));
}

const curtains = [
  { left: 2, w: 34, h: 74, dur: 17, delay: 0, c: "lime" },
  { left: 24, w: 30, h: 66, dur: 21, delay: -7, c: "lime" },
  { left: 46, w: 32, h: 78, dur: 19, delay: -3, c: "lime" },
  { left: 66, w: 34, h: 70, dur: 23, delay: -11, c: "lime" },
];

const streaks = buildStreaks();
const stars = buildStars();

export default function HeroBackground() {
  return (
    <div aria-hidden className="hero-bg pointer-events-none absolute inset-0 overflow-hidden">
      {/* Stars */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {stars.map((s, i) => (
          <ellipse
            key={i}
            cx={s.x}
            cy={s.y}
            rx={s.r * 0.1}
            ry={s.r * 0.17}
            fill={s.o > 0.7 ? "var(--brand-lime)" : "#fff"}
            opacity={s.o}
            className={s.twinkle ? "hero-star" : undefined}
            style={s.twinkle ? ({ "--d": `${s.d}s`, "--w": `${s.w}s` } as React.CSSProperties) : undefined}
          />
        ))}
      </svg>

      {/* Colour layers that cross-fade, so the whole sky keeps shifting hue */}
      <div className="hero-tint hero-tint-lime absolute inset-0" />
      <div className="hero-tint hero-tint-purple absolute inset-0" />
      <div className="hero-tint hero-tint-blue absolute inset-0" />
      <div className="hero-tint hero-tint-orange absolute inset-0" />

      {/* Big soft curtains (slow sway) */}
      <div className="absolute inset-0" data-depth="14">
        {curtains.map((c, i) => (
          <span
            key={i}
            className="hero-curtain"
            style={
              {
                left: `${c.left}%`,
                width: `${c.w}%`,
                height: `${c.h}%`,
                "--dur": `${c.dur}s`,
                "--delay": `${c.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Fine aurora rays; the group moves a little with the cursor (parallax) */}
      <div className="absolute inset-0" data-depth="30">
        <div className="hero-streaks absolute inset-x-0 bottom-0 h-[92%]">
          {streaks.map((s, i) => (
            <span
              key={i}
              className="hero-streak"
              style={
                {
                  left: `${s.left}%`,
                  width: `${s.width}vw`,
                  height: `${s.height}%`,
                  filter: `blur(${s.blur}px)`,
                  "--o": s.opacity,
                  "--a": s.accent,
                  "--dur": `${s.dur}s`,
                  "--delay": `${s.delay}s`,
                  "--sway": `${s.sway}vw`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      {/* Floor glow where the light pools */}
      <div className="hero-floor absolute inset-x-0 bottom-0 h-[45%]" />

      {/* Premium shading: vignette + top darkening */}
      <div className="hero-shade absolute inset-0" />

      {/* Horizon rim-light arc */}
      <div className="hero-arc" />

      {/* Cursor light + pointer tracking */}

      {/* Film grain */}
      <div className="hero-grain absolute inset-0" />
    </div>
  );
}
