/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mat.digital",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  generateIndexSitemap: false,
  sitemapSize: 5000,
  outDir: "./out",
};
