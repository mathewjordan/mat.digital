import { Heading, Text } from "@radix-ui/themes";

import fs from "fs";
import { getMarkdown } from "@/lib/markdown-helpers";
import { getPosts } from "@/lib/post-helpers";
import { notFound } from "next/navigation";

const PLACEHOLDER_SLUG = "__placeholder__";

export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getPosts();
  if (posts.length === 0) {
    return [{ slug: PLACEHOLDER_SLUG }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  if (params.slug === PLACEHOLDER_SLUG) {
    notFound();
  }
  const extensions = [".mdx", ".md"];
  const path = extensions
    .map((ext) => `content/posts/${params.slug}${ext}`)
    .find((filePath) => fs.existsSync(filePath));

  if (!path) {
    notFound();
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
