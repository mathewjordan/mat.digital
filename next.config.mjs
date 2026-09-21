/** @type {import('next').NextConfig} */
const nextConfig = {
  // Development renders new drafts on demand; production always exports static files.
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "iiif.dc.library.northwestern.edu",
      },
    ],
  },
};

export default nextConfig;
