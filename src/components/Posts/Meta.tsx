import { Badge, Flex, Text } from "@radix-ui/themes";
import { formatPostDate, type Post } from "@/lib/post-helpers";

export default function PostMeta({ post }: { post: Post }) {
  return (
    <Flex gap="3" align="center" wrap="wrap" className="post-meta">
      {post.date && <Text color="gray" size="2" asChild><time dateTime={post.date}>{formatPostDate(post.date)}</time></Text>}
      <Text color="gray" size="2">{post.readingMinutes} min read</Text>
      {post.draft && <Badge color="amber" variant="soft">Draft</Badge>}
    </Flex>
  );
}
