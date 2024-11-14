/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "iiif.dc.library.northwestern.edu",
      },
    ],
  },
};

export default nextConfig;
