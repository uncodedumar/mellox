const UNSPLASH = "images.unsplash.com";
const WIDTHS = [480, 800, 1200, 1600];

/** Unsplash covers are resized by Unsplash itself, so a small card never downloads the full 1600px photo. */
function unsplashSrcSet(url: string): string | undefined {
  try {
    const u = new URL(url);
    if (u.hostname !== UNSPLASH) return undefined;
    return WIDTHS.map((w) => {
      const v = new URL(u);
      v.searchParams.set("w", String(w));
      v.searchParams.set("auto", "format"); // WebP/AVIF where the browser supports it
      v.searchParams.set("q", "75");
      return `${v.toString()} ${w}w`;
    }).join(", ");
  } catch {
    return undefined;
  }
}

/**
 * Post cover image, or a brand-colour gradient (picked from the slug) when a post has no cover.
 * `sizes` tells the browser how wide the image is shown; `priority` is for the one cover that is above the fold.
 */
export default function BlogCover({
  slug,
  cover,
  alt = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 400px",
  priority = false,
}: {
  slug: string;
  cover?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (cover) {
    const srcSet = unsplashSrcSet(cover);
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="bl-cover-img"
        src={cover}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    );
  }
  let h = 0;
  for (const c of slug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return (
    <div className={`bl-cover-fallback bl-fb-${h % 4}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/mark-lime.svg" alt="" width={72} height={38} />
    </div>
  );
}
