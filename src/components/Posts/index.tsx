import { Box, Heading } from "@radix-ui/themes";

import PostsTeaser from "./Teaser";
import { getPosts } from "@/lib/post-helpers";

const Posts = () => {
  const posts = getPosts();

  return (
    <>
      <Heading as="h2">Posts</Heading>
      <Box>
        {posts.map((post) => (
          <PostsTeaser key={post.slug} {...post} />
        ))}
      </Box>
    </>
  );
};

export default Posts;
