import { Text } from "@radix-ui/themes";
import PostsTeaser from "./Teaser";
import { getPosts } from "@/lib/post-helpers";

interface PostsProps {
  limit?: number;
  heading?: "h2" | "h3";
}

export default function Posts({ limit, heading = "h2" }: PostsProps) {
  const posts = getPosts().slice(0, limit);
  if (!posts.length) {
    return <Text as="p" color="gray" my="5">The first article is on its way.</Text>;
  }
  return (
    <ul className="post-list post-grid">
      {posts.map((post) => (
        <PostsTeaser key={post.slug} post={post} heading={heading} />
      ))}
    </ul>
  );
}
