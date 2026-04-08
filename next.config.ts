import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.nasa.gov' },
      { protocol: 'https', hostname: 'www.asc-csa.gc.ca' },
    ],
  },
};

export default nextConfig;
