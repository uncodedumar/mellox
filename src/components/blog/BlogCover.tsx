/** Post cover image, or a brand-colour gradient (picked from the slug) when a post has no cover. */
export default function BlogCover({ slug, cover, alt = "" }: { slug: string; cover?: string; alt?: string }) {
  if (cover) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="bl-cover-img" src={cover} alt={alt} loading="lazy" decoding="async" />;
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
