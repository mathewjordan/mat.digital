import fs from "fs";
import path from "path";

interface Post {
  slug: string;
  content: string;
}

export function getPosts(postsDirectory: string = "content/posts"): Post[] {
  const directoryPath = path.isAbsolute(postsDirectory)
    ? postsDirectory
    : path.join(process.cwd(), postsDirectory);
  try {
    return fs
      .readdirSync(directoryPath)
      .filter(
        (fileName: string) =>
          fileName.endsWith(".md") || fileName.endsWith(".mdx")
      )
      .filter((fileName: string) => fileName !== "README.md")
      .map((fileName: string) => {
        const slug: string = fileName.replace(/\.mdx?$/, "");
        const filePath: string = path.join(directoryPath, fileName);
        const content: string = fs.readFileSync(filePath, {
          encoding: "utf-8",
        });
        return { slug, content };
      });
  } catch (error) {
    console.error(
      `Error reading posts from ${directoryPath}: ${(error as Error).message}`
    );
    return [];
  }
}
