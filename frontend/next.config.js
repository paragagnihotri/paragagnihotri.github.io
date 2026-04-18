/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.credly.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
      { protocol: "https", hostname: "d2908q01vomqb2.cloudfront.net" },
      { protocol: "https", hostname: "**.medium.com" },
      { protocol: "https", hostname: "github.com" }
    ],
  },
};

module.exports = nextConfig;
