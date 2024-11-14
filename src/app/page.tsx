import Posts from "@/components/Posts";
import { getMarkdown } from "@/lib/markdown-helpers";
export default async function Home() {
  const path = "content/index.mdx";
  const markdown = await getMarkdown(path);

  return (
    <>
      {markdown?.content}
      {/* <Posts /> */}
    </>
  );
}
