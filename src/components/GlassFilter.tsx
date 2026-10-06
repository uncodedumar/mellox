/**
 * Intentionally empty. The old SVG refraction filter (feTurbulence + feDisplacementMap behind every
 * backdrop-filter) cost seconds of main-thread time on phones, so `.glass` now uses a plain blur.
 * Kept as a no-op so the pages that still render <GlassFilter /> keep compiling.
 */
export default function GlassFilter() {
  return null;
}
