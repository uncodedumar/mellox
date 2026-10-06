import Link from "next/link";
import BlogCover from "./BlogCover";

export type CardPost = {
  slug: string;
  title: string;
  description: string;
  dateLabel: string;
  minutes: number;
  tags?: string[];
  author?: string;
  cover?: string;
  coverAlt?: string;
};

/** Post card used on the blog page and in "keep reading". `featured` makes the wide, two-column variant. */
export default function BlogCard({ post, featured = false }: { post: CardPost; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className={`bl-card${featured ? " bl-card-featured" : ""}`}>
      <div className="bl-card-cover">
        <BlogCover
          slug={post.slug}
          cover={post.cover}
          alt={post.coverAlt}
          sizes={featured ? "(max-width: 860px) 100vw, 55vw" : undefined}
        />
      </div>
      <div className="bl-card-body">
        {post.tags && post.tags.length > 0 && (
          <ul className="bl-tags" aria-label="Tags">
            {post.tags.slice(0, 3).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        <h3>{post.title}</h3>
        <p>{post.description}</p>
        <div className="bl-meta">
          {post.author && <span>{post.author}</span>}
          <span>{post.dateLabel}</span>
          <span>{post.minutes} min read</span>
        </div>
      </div>
    </Link>
  );
}
