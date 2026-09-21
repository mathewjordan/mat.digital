import { getMarkdown } from "@/lib/markdown-helpers";

export default async function Home() {
  const path = "content/index.mdx";
  const markdown = await getMarkdown(path);

  return (
    <>
      <h1 className="sr-only">Mat Jordan — Designer and Developer</h1>
      {markdown.content}
    </>
  );
}
