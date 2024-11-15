import { Heading, Text } from "@radix-ui/themes";

import fs from "fs";
import { getMarkdown } from "@/lib/markdown-helpers";
import { getPosts } from "@/lib/post-helpers";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => {
    return { slug: post.slug };
  });
}

export default async function Post({ params }: { params: { slug: string } }) {
  const extensions = [".mdx", ".md"];
  const path = extensions
    .map((ext) => `content/posts/${params.slug}${ext}`)
    .find((filePath) => fs.existsSync(filePath));

  if (!path) {
    throw new Error(`Post not found for slug: ${params.slug}`);
  }

  const markdown = await getMarkdown(path);

  // @ts-ignore
  const { title = "Untitled", description } = markdown?.frontmatter;

  return (
    <>
      <Heading as="h1" size="8">
        {title}
      </Heading>
      {description && <Text size="4">{description}</Text>}

      <article>{markdown?.content}</article>
    </>
  );
}
