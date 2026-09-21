const fs = require("fs");
const path = require("path");

const allowIndexing = process.env.ALLOW_INDEXING === "true";

// Drafts are exported so they can be shared by direct link, but they must stay
// out of the sitemap. Read the frontmatter here rather than import the TypeScript
// helper, since this config runs as plain CommonJS after the build.
function draftPaths() {
  const dir = path.join(__dirname, "content", "posts");
  let entries = [];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return [];
  }
  return entries
    .filter((name) => /\.mdx?$/.test(name) && !/^readme\.mdx?$/i.test(name) && !name.startsWith("_"))
    .filter((name) => {
      const frontmatter = fs.readFileSync(path.join(dir, name), "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/);
      return frontmatter ? /^draft:\s*true\s*$/m.test(frontmatter[1]) : false;
    })
    .flatMap((name) => {
      const slug = name.replace(/\.mdx?$/, "");
      return [`/posts/${slug}`, `/posts/${slug}/`];
    });
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mat.digital",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  outDir: "./out",
  exclude: ["/posts/__placeholder__", "/posts/__placeholder__/", ...draftPaths()],
  robotsTxtOptions: {
    policies: allowIndexing
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
  },
};
