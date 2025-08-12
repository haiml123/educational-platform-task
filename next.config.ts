import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/videos",
        permanent: true, // Use false for temporary redirect (302)
      },
    ];
  },
};

export default nextConfig;
