"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import BlogCard, { type CardPost } from "./BlogCard";

/** Blog index: search box, tag filter, a featured latest post and a grid of the rest. */
export default function BlogList({ posts }: { posts: CardPost[] }) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");

  const tags = useMemo(() => ["All", ...Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort()], [posts]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag !== "All" && !(p.tags ?? []).includes(tag)) return false;
      if (!needle) return true;
      return [p.title, p.description, ...(p.tags ?? [])].join(" ").toLowerCase().includes(needle);
    });
  }, [posts, q, tag]);

  const showFeatured = tag === "All" && !q.trim() && filtered.length > 1;
  const featured = showFeatured ? filtered[0] : null;
  const rest = showFeatured ? filtered.slice(1) : filtered;

  return (
    <>
      <div className="bl-tools" data-reveal>
        <label className="bl-search">
          <Search size={20} aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
          />
        </label>
        {tags.length > 2 && (
          <div className="bl-chips" role="group" aria-label="Filter by topic">
            {tags.map((t) => (
              <button key={t} type="button" aria-pressed={tag === t} onClick={() => setTag(t)}>
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      {featured && (
        <div data-reveal>
          <BlogCard post={featured} featured />
        </div>
      )}

      {rest.length > 0 && (
        <div className="bl-grid">
          {rest.map((p) => (
            <div key={p.slug} data-reveal>
              <BlogCard post={p} />
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="bl-empty">
          {posts.length === 0 ? "No articles yet. Check back soon." : "No articles match your search."}
        </p>
      )}
    </>
  );
}
