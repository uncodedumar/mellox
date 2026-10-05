import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import BlogList from "@/components/blog/BlogList";
import Footer from "@/components/Footer";
import GlassFilter from "@/components/GlassFilter";
import Navbar from "@/components/Navbar";
import PricingHeroBackground from "@/components/pricing/PricingHeroBackground";
import PricingReveal from "@/components/pricing/PricingReveal";
import { formatDate, getPosts } from "@/lib/blog";
import "@/components/pricing/pricing.css";
import "@/components/blog/blog.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides, product news and ideas on AI search, GEO and marketing from the Mellox team.",
};

export default async function BlogPage() {
  const posts = (await getPosts()).map((p) => ({
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

  return (
    <div className="px relative flex min-h-screen flex-col overflow-x-clip">
      <PricingReveal />

      <header className="px-hero relative flex flex-col items-center px-5 pb-16 pt-36 sm:pt-40">
        <PricingHeroBackground />
        <GlassFilter />
        <Navbar />

        <div className="relative z-10 flex flex-col items-center">
          <p className="px-hero-pill">
            <Newspaper size={26} strokeWidth={1.4} aria-hidden="true" />
            Blog
          </p>
          <h1 className="bl-h1">Ideas for the AI search era</h1>
          <p className="lede">Guides, product news and practical tips for getting your brand recommended.</p>
        </div>
      </header>

      <main>
        <section className="px-section" style={{ paddingTop: 0 }}>
          <div className="px-inner">
            <BlogList posts={posts} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
