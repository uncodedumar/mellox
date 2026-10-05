/**
 * Pricing hero backdrop: vertical aurora curtains hanging from the top edge,
 * orange on the far left, lime across the centre, blue on the far right, fading to black below.
 * Static blurs; only transform/opacity animate. Server-rendered, deterministic.
 */

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

/** Colour across the hero: warm orange -> amber -> mauve -> blue -> deep blue. */
const STOPS: [number, [number, number, number]][] = [
  [0.0, [140, 70, 20]],
  [0.12, [240, 140, 30]],
  [0.27, [203, 233, 96]],
  [0.45, [200, 238, 90]],
  [0.58, [214, 240, 130]],
  [0.7, [90, 140, 225]],
  [0.84, [30, 100, 235]],
  [1.0, [20, 60, 170]],
];
function colourAt(t: number) {
  for (let i = 1; i < STOPS.length; i++) {
    const [t1, c1] = STOPS[i];
    const [t0, c0] = STOPS[i - 1];
    if (t <= t1) {
      const k = (t - t0) / (t1 - t0);
      return c0.map((v, j) => Math.round(v + (c1[j] - v) * k)) as [number, number, number];
    }
  }
  return STOPS[STOPS.length - 1][1];
}

function build() {
  const rand = mulberry32(7);
  const count = 78;
  return Array.from({ length: count }, (_, i) => {
    const t = (i + rand()) / count;
    // brightest in the middle band, dimming toward both edges
    const bell = Math.exp(-Math.pow((t - 0.5) / 0.3, 2));
    const [r, g, b] = colourAt(t);
    return {
      left: r2(t * 100),
      width: r2(0.7 + rand() * 2.6), // vw
      height: r2(46 + rand() * 54 * (0.55 + 0.45 * bell)), // % of the hero
      blur: r2(3 + rand() * 9),
      opacity: r2((0.3 + 0.7 * bell) * (0.45 + 0.55 * rand())),
      rgb: `${r} ${g} ${b}`,
      dur: r2(7 + rand() * 9),
      delay: r2(-rand() * 14),
      sway: r2((rand() - 0.5) * 2.4),
    };
  });
}

function stars() {
  const rand = mulberry32(99);
  return Array.from({ length: 70 }, () => ({
    x: r2(rand() * 100),
    y: r2(rand() * 90),
    r: r2(0.5 + rand() * 0.9),
    o: r2(0.18 + rand() * 0.5),
  }));
}

const streaks = build();
const dots = stars();

export default function PricingHeroBackground() {
  return (
    <div aria-hidden className="pxh-bg pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {dots.map((s, i) => (
          <ellipse key={i} cx={s.x} cy={s.y} rx={s.r * 0.08} ry={s.r * 0.13} fill="#fff" opacity={s.o} />
        ))}
      </svg>

      {/* broad soft colour bodies behind the fine rays */}
      <div className="pxh-body pxh-body-orange" />
      <div className="pxh-body pxh-body-lime" />
      <div className="pxh-body pxh-body-blue" />

      <div className="pxh-streaks absolute inset-x-0 top-0 h-full">
        {streaks.map((s, i) => (
          <span
            key={i}
            className="pxh-streak"
            style={
              {
                left: `${s.left}%`,
                width: `${s.width}vw`,
                height: `${s.height}%`,
                filter: `blur(${s.blur}px)`,
                "--o": s.opacity,
                "--c": s.rgb,
                "--dur": `${s.dur}s`,
                "--delay": `${s.delay}s`,
                "--sway": `${s.sway}vw`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="pxh-shade absolute inset-0" />
      <div className="pxh-grain absolute inset-0" />
    </div>
  );
}
