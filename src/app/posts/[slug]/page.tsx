import { Heading, Text } from "@radix-ui/themes";

import { getMarkdown } from "@/lib/markdown-helpers";
import { getPosts } from "@/lib/post-helpers";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => {
    return { slug: post.slug };
  });
}

export default async function Post({ params }: { params: { slug: string } }) {
  const path = "content/posts/" + params.slug + ".mdx";
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
