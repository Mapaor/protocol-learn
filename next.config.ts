import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.openai.com',
      // Add other domains as needed
    ],
  },
};

export default nextConfig;
