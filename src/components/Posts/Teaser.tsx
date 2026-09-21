import { Card, Heading, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import PostMeta from "./Meta";
import type { Post } from "@/lib/post-helpers";

interface PostsTeaserProps {
  post: Post;
  heading?: "h2" | "h3";
}

export default function PostsTeaser({ post, heading = "h2" }: PostsTeaserProps) {
  return (
    <li>
      <Card asChild size="3" className="post-card">
        <NextLink href={`/posts/${post.slug}/`} aria-labelledby={`post-${post.slug}`}>
          {post.thumbnail && (
            /* Decorative: abstract artwork carrying no meaning the title does not.
               next/image is no help for an SVG — it cannot optimise one without
               dangerouslyAllowSVG, and this is a static export. */
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.thumbnail} alt="" width={144} height={144} className="post-card-thumb" />
          )}
          <div className="post-card-text">
            <Heading as={heading} size="5" id={`post-${post.slug}`}>
              {post.title}
            </Heading>
            <PostMeta post={post} />
            <Text as="p" size="3" mt="2">{post.description}</Text>
          </div>
        </NextLink>
      </Card>
    </li>
  );
}
