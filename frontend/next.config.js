/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.credly.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
