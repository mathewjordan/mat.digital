import type { Metadata } from "next";
import { Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import UILink from "@/components/UI/Link";
import PostMeta from "@/components/Posts/Meta";
import Toc from "@/components/Posts/Toc";
import { getMarkdown } from "@/lib/markdown-helpers";
import { getAllPosts, getPost } from "@/lib/post-helpers";

const PLACEHOLDER_SLUG = "__placeholder__";
// Next 15 onward: route params arrive as a Promise.
type PostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Drafts get a route as well: unlisted, but reachable by direct link.
  const posts = getAllPosts();
  // Next.js 14 static export needs a param even before the first post is published.
  return posts.length ? posts.map(({ slug }) => ({ slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Mat Jordan`,
    description: post.description,
    alternates: { canonical: `/posts/${post.slug}/` },
    authors: [{ name: "Mat Jordan", url: "https://mat.digital" }],
    ...(post.draft && { robots: { index: false, follow: false } }),
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/posts/${post.slug}/`,
      ...(post.date && { publishedTime: `${post.date}T00:00:00Z` }),
      authors: ["Mat Jordan"],
    },
    twitter: { card: "summary", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const markdown = await getMarkdown(post.filePath);

  return (
    <article className="post">
      <header className="post-header">
        {post.thumbnail && (
          /* Decorative backdrop, hidden from assistive tech: the article's own
             heading and standfirst already say what this is. */
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.thumbnail} alt="" aria-hidden="true" className="post-backdrop" />
        )}
        <UILink href="/posts/" className="post-back">↑ All posts</UILink>
        <Heading as="h1" size="8" mt="4">{post.title}</Heading>
        <Text as="p" size="5" mt="4" className="post-description">{post.description}</Text>
      </header>
      <div className="post-lede">
        <PostMeta post={post} />
        <Toc headings={markdown.headings} />
      </div>
      <div className="post-body">{markdown.content}</div>
      <footer className="post-footer">
        <Text as="p" color="gray" size="2">By Mat Jordan</Text>
        <UILink href="/posts/">← All posts</UILink>
      </footer>
    </article>
  );
}
