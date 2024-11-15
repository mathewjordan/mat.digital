import fs from "fs";

interface Post {
  slug: string;
  content: string;
}

export function getPosts(postsDirectory: string = "content/posts"): Post[] {
  try {
    return fs
      .readdirSync(postsDirectory)
      .filter(
        (fileName: string) =>
          fileName.endsWith(".md") || fileName.endsWith(".mdx")
      )
      .filter((fileName: string) => fileName !== "README.md")
      .map((fileName: string) => {
        const slug: string = fileName.replace(/\.mdx?$/, "");
        const path: string = `${postsDirectory}/${fileName}`;
        const content: string = fs.readFileSync(path, { encoding: "utf-8" });
        return { slug, content };
      });
  } catch (error) {
    console.error(`Error reading posts: ${(error as Error).message}`);
    return [];
  }
}
