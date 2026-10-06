import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/blog/BlogCard";
import BlogCover from "@/components/blog/BlogCover";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { formatDate, getPost, getPosts, getSlugs } from "@/lib/blog";
import "@/components/pricing/pricing.css";
import "@/components/blog/blog.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mellox.ai";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getSlugs()).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPost(slug);
  if (!found) return {};
  const { post } = found;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.cover ? [{ url: post.cover, alt: post.coverAlt ?? post.title }] : undefined,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const found = await getPost(slug);
  if (!found) notFound();
  const { post, Content } = found;

  const related = (await getPosts())
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const shared = (p: typeof a) => (p.tags ?? []).filter((t) => (post.tags ?? []).includes(t)).length;
      return shared(b) - shared(a) || b.date.localeCompare(a.date);
    })
    .slice(0, 2)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      description: p.description,
      dateLabel: formatDate(p.date),
      minutes: p.minutes,
      tags: p.tags,
      author: p.author,
      cover: p.cover,
      coverAlt: p.coverAlt,
    }));

  const url = `${SITE}/blog/${slug}`;
  const share = (base: string) => `${base}${encodeURIComponent(url)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author ?? "Mellox Team" },
    publisher: { "@type": "Organization", name: "Mellox AI" },
    mainEntityOfPage: url,
    ...(post.cover ? { image: post.cover.startsWith("http") ? post.cover : `${SITE}${post.cover}` } : {}),
  };

  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-12 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <Link href="/blog" className="bl-back">
            <ArrowLeft size={18} aria-hidden="true" />
            All articles
          </Link>
          {post.tags && post.tags.length > 0 && (
            <ul className="bl-tags bl-tags-center" aria-label="Tags">
              {post.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <h1 className="bl-h1 bl-h1-post">{post.title}</h1>
          <p className="lede">{post.description}</p>
          <div className="bl-byline">
            <span className="bl-avatar" aria-hidden="true">
              {(post.author ?? "M").charAt(0)}
            </span>
            <span>
              <b>{post.author ?? "Mellox Team"}</b>
              {post.authorRole && <i>{post.authorRole}</i>}
            </span>
            <span className="bl-dot" aria-hidden="true" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="bl-dot" aria-hidden="true" />
            <span>{post.minutes} min read</span>
          </div>
        </div>
      </header>

      <main>
        {post.cover && (
          <div className="px-inner bl-cover-wrap">
            <div className="bl-cover-hero" data-reveal>
              <BlogCover slug={slug} cover={post.cover} alt={post.coverAlt} sizes="(max-width: 1200px) 100vw, 1120px" priority />
            </div>
            {post.coverCredit && (
              <p className="bl-credit">
                Photo by{" "}
                <a href={`${post.coverCredit.href}?utm_source=mellox&utm_medium=referral`} target="_blank" rel="noopener noreferrer">
                  {post.coverCredit.name}
                </a>{" "}
                on{" "}
                <a href="https://unsplash.com/?utm_source=mellox&utm_medium=referral" target="_blank" rel="noopener noreferrer">
                  Unsplash
                </a>
              </p>
            )}
          </div>
        )}

        <article className="bl-prose">
          <Content />
        </article>

        <div className="px-inner">
          <div className="bl-share" aria-label="Share this article">
            <span>Share</span>
            <a href={share("https://x.com/intent/tweet?url=")} target="_blank" rel="noopener noreferrer">
              X
            </a>
            <a href={share("https://www.linkedin.com/sharing/share-offsite/?url=")} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={share("https://www.facebook.com/sharer/sharer.php?u=")} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <section className="px-section">
            <div className="px-inner">
              <p className="px-label">Keep reading</p>
              <div className="px-rule" />
              <div className="bl-grid bl-grid-2" style={{ marginTop: 40 }}>
                {related.map((p) => (
                  <div key={p.slug} data-reveal>
                    <BlogCard post={p} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-section">
          <div className="px-inner">
            <div className="px-card bl-cta" data-reveal>
              <div>
                <h2>See how AI talks about your brand.</h2>
                <p>Start free. No credit card required.</p>
              </div>
              <a href="https://app.mellox.ai" className="px-cta px-cta-lime">
                Get started
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
