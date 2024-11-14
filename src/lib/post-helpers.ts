import fs from "fs";

export function getPosts() {
  const postsDirectory = "content/posts";
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map((fileName) => {
    // md or mdx
    const slug = fileName.replace(/\.mdx?$/, "");
    const path = `${postsDirectory}/${fileName}`;
    const content = fs.readFileSync(path, {}).toString();
    return { slug, content };
  });
  return posts;
}
