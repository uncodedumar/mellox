import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Building blocks for blog posts. They are available in every .mdx post without importing,
 * and can be placed anywhere, in any order, as many times as you like.
 * (Registered in src/mdx-components.tsx.)
 */

const isExternal = (href = "") => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

/** Turns heading text into a url-safe id (so headings can be linked to with #anchors). */
export function slugify(node: ReactNode): string {
  const text = typeof node === "string" ? node : Array.isArray(node) ? node.map(slugify).join(" ") : "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function Heading({ level, children, ...rest }: { level: 1 | 2 | 3 | 4 } & ComponentPropsWithoutRef<"h2">) {
  const Tag = `h${level}` as "h2";
  const id = rest.id ?? slugify(children);
  return (
    <Tag {...rest} id={id || undefined}>
      {children}
    </Tag>
  );
}

export const H1 = (p: ComponentPropsWithoutRef<"h1">) => <Heading level={1} {...p} />;
export const H2 = (p: ComponentPropsWithoutRef<"h2">) => <Heading level={2} {...p} />;
export const H3 = (p: ComponentPropsWithoutRef<"h3">) => <Heading level={3} {...p} />;
export const H4 = (p: ComponentPropsWithoutRef<"h4">) => <Heading level={4} {...p} />;

/** Markdown links: internal ones use the Next router, external ones open in a new tab. */
export function A({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

/** Markdown images `![alt](/blog/x.png)` work anywhere; they take the full reading width. */
export function Img({ alt = "", ...rest }: ComponentPropsWithoutRef<"img">) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} loading="lazy" decoding="async" {...rest} />;
}

/** `<Figure src="/blog/x.png" alt="..." caption="..." size="wide" />`. size: "text" (default) | "wide" | "full". */
export function Figure({
  src,
  alt = "",
  caption,
  size = "text",
  href,
}: {
  src: string;
  alt?: string;
  caption?: ReactNode;
  size?: "text" | "wide" | "full";
  href?: string;
}) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  );
  return (
    <figure className={`bl-figure bl-size-${size}`}>
      {href ? (
        <a href={href} {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {img}
        </a>
      ) : (
        img
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** Side-by-side blocks: `<Columns cols={2}><Col>...anything...</Col><Col>...</Col></Columns>`. */
export function Columns({ cols = 2, size = "wide", children }: { cols?: 2 | 3 | 4; size?: "text" | "wide" | "full"; children: ReactNode }) {
  return (
    <div className={`bl-columns bl-cols-${cols} bl-size-${size}`}>{children}</div>
  );
}
export function Col({ children }: { children: ReactNode }) {
  return <div className="bl-col">{children}</div>;
}

/** A row or grid of images: `<Gallery cols={3} images={[{ src, alt, caption }]} />`. */
export function Gallery({
  images,
  cols = 3,
  size = "wide",
}: {
  images: { src: string; alt?: string; caption?: string }[];
  cols?: 2 | 3 | 4;
  size?: "text" | "wide" | "full";
}) {
  return (
    <div className={`bl-gallery bl-cols-${cols} bl-size-${size}`}>
      {images.map((im) => (
        <figure key={im.src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={im.src} alt={im.alt ?? ""} loading="lazy" decoding="async" />
          {im.caption && <figcaption>{im.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

/** Highlighted note. tone: lime (default) | blue | orange | purple | red. */
export function Callout({
  title,
  tone = "lime",
  children,
}: {
  title?: string;
  tone?: "lime" | "blue" | "orange" | "purple" | "red";
  children: ReactNode;
}) {
  return (
    <aside className={`bl-callout bl-tone-${tone}`}>
      {title && <strong>{title}</strong>}
      <div>{children}</div>
    </aside>
  );
}

/** Pull quote: `<Quote by="Name, Role">text</Quote>`. */
export function Quote({ by, children }: { by?: string; children: ReactNode }) {
  return (
    <figure className="bl-quote bl-size-wide">
      <blockquote>{children}</blockquote>
      {by && <figcaption>{by}</figcaption>}
    </figure>
  );
}

/** Call-to-action button. variant: lime (default) | ghost. */
export function Button({
  href,
  variant = "lime",
  children,
}: {
  href: string;
  variant?: "lime" | "ghost";
  children: ReactNode;
}) {
  const cls = `bl-button bl-button-${variant}`;
  return isExternal(href) ? (
    <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}

/** Big numbers: `<Stats items={[{ value: "3x", label: "faster" }]} />`. */
export function Stats({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="bl-stats bl-size-wide">
      {items.map((s) => (
        <div key={s.label}>
          <b>{s.value}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/** YouTube embed: `<YouTube id="dQw4w9WgXcQ" title="..." />`. */
export function YouTube({ id, title = "Video", size = "wide" }: { id: string; title?: string; size?: "text" | "wide" | "full" }) {
  return (
    <div className={`bl-embed bl-size-${size}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        loading="lazy"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
      />
    </div>
  );
}

/** Any other embed (Loom, Figma, maps...): `<Embed src="https://..." ratio="16/9" />`. */
export function Embed({ src, title = "Embedded content", ratio = "16/9", size = "wide" }: { src: string; title?: string; ratio?: string; size?: "text" | "wide" | "full" }) {
  return (
    <div className={`bl-embed bl-size-${size}`} style={{ aspectRatio: ratio }}>
      <iframe src={src} title={title} loading="lazy" allowFullScreen />
    </div>
  );
}

/** Lets any block break out of the text column: `<Wide>...anything...</Wide>`. */
export function Wide({ size = "wide", children }: { size?: "wide" | "full"; children: ReactNode }) {
  return <div className={`bl-size-${size}`}>{children}</div>;
}

/** Centre anything: `<Center>...</Center>`. */
export function Center({ children }: { children: ReactNode }) {
  return <div className="bl-center">{children}</div>;
}

/** Extra breathing room: `<Spacer size="lg" />`. */
export function Spacer({ size = "md" }: { size?: "sm" | "md" | "lg" | "xl" }) {
  return <div className={`bl-spacer bl-spacer-${size}`} aria-hidden="true" />;
}
