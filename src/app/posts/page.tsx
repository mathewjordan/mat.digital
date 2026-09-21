import type { Metadata } from "next";
import { Heading, Text } from "@radix-ui/themes";
import Posts from "@/components/Posts";

export const metadata: Metadata = {
  title: "Posts | Mat Jordan",
  description: "Notes on work, life, and whatever holds my attention.",
  alternates: { canonical: "/posts/" },
};

export default function PostsPage() {
  return (
    <section aria-labelledby="posts-title" className="posts-page">
      <Heading as="h1" size="8" id="posts-title">Posts</Heading>
      <Text as="p" color="gray" size="4" mt="3" mb="7">Notes on work, life, and whatever holds my attention.</Text>
      <Posts />
    </section>
  );
}
