/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
