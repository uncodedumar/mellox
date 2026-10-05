import { formatDate, getPost } from "@/lib/blog";
import { ogImage } from "@/lib/og";

export const alt = "Mellox AI blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = await getPost(slug);
  const post = found?.post;
  return ogImage({
    title: post?.title ?? "The Mellox blog",
    subtitle: post ? `${post.author ?? "Mellox Team"} · ${formatDate(post.date)}` : undefined,
    eyebrow: post?.tags?.[0] ?? "Blog",
  });
}
