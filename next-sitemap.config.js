/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://mat.digital",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  sitemapSize: 5000,
};
