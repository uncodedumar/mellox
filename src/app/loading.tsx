import "@/components/preloader.css";

const MARK_PATH = "M351.833 230.931C354.699 228.573 358.737 228.268 361.925 230.168C365.573 232.343 367.146 236.815 365.662 240.795L356.61 265.077L317.897 370.654L375.883 316.129C376.769 315.296 377.928 314.814 379.143 314.774L488.638 311.17C492.829 311.032 496.697 313.408 498.468 317.209C500.533 321.641 499.254 326.913 495.387 329.906L406.294 398.844C399.461 404.131 391.066 407 382.427 407H356.61L424.574 357.673L302.539 405.273C299.76 406.356 296.629 406.028 294.136 404.393C290.645 402.103 289.131 397.753 290.444 393.79L317.897 310.942L258.718 404.669C257.802 406.12 256.206 407 254.49 407H160.619C157.172 407 154.096 404.834 152.934 401.588C151.774 398.345 152.774 394.723 155.433 392.535L351.833 230.931Z";

/** Shown by Next.js while a route is loading (page transitions, slow networks). */
export default function Loading() {
  return (
    <div className="mx-load" role="status" aria-live="polite" aria-label="Loading">
      <div className="mx-load-bar" aria-hidden="true">
        <span />
      </div>
      <div className="mx-load-glow" aria-hidden="true" />
      <svg className="mx-load-mark" viewBox="150 226 352 184" fill="none" aria-hidden="true">
        <path d={MARK_PATH} fill="#CBE960" />
      </svg>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
