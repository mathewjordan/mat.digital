import { Flex, Heading, Section, Text } from "@radix-ui/themes";
import Posts from ".";
import UILink from "../UI/Link";
import { getPosts } from "@/lib/post-helpers";

export default function RecentPosts() {
  // With nothing published, drop the whole section rather than show a heading
  // and a link into an empty archive.
  if (!getPosts().length) return null;

  return (
    <Section size="1" aria-labelledby="recent-posts">
      <Flex align="baseline" justify="between" gap="3" wrap="wrap">
        <Heading as="h2" size="6" id="recent-posts">Posts</Heading>
        <Text size="2">
          <UILink href="/posts/" className="all-posts-link">All posts</UILink>
        </Text>
      </Flex>
      <Posts limit={3} heading="h3" />
    </Section>
  );
}
