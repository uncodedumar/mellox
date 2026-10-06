// One definition of "this visitor gets a static site", shared by the JS gates and mirrored in CSS.
//
// Static = prefers-reduced-motion, or a touch-first device (phones, tablets: primary pointer is coarse / cannot hover).
// Desktops, laptops and touchscreen laptops (primary pointer is a mouse/trackpad) keep the full animated experience.
// CSS mirrors this exact list in `@media (prefers-reduced-motion: reduce), (pointer: coarse), (hover: none)`.

export const STATIC_MOTION_QUERY = "(prefers-reduced-motion: reduce), (pointer: coarse), (hover: none)";
export const COARSE_QUERY = "(pointer: coarse), (hover: none)";

export function prefersStaticMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(STATIC_MOTION_QUERY).matches;
}

export function isTouchFirst(): boolean {
  return typeof window !== "undefined" && window.matchMedia(COARSE_QUERY).matches;
}
