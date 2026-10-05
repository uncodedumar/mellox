# Blog posts

Each `.mdx` file in this folder is one blog post. The file name is the url:

    src/content/blog/my-post.mdx  ->  /blog/my-post

1. Copy `_template.mdx` to a new file (lowercase letters, numbers and dashes only).
2. Edit the `meta` block at the top (title, description, date, author, tags, optional cover).
3. Write below it. There is no fixed layout: headings, sub headings, text, images, links, columns,
   galleries, callouts, videos, buttons and tables can go anywhere, in any order.
4. Put images in `public/blog/<your-post>/` and refer to them as `/blog/<your-post>/image.png`.

Files starting with `_` are ignored. Add `unlisted: true` to `meta` to hide a post from the blog page
while keeping its url working. Posts are sorted by `date`, newest first.

The full list of blocks (Figure, Columns, Gallery, Callout, Quote, Stats, Button, YouTube, Embed,
Wide, Center, Spacer) is shown in `_template.mdx`.
