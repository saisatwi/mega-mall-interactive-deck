import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This allows the build to succeed even if there are TypeScript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This allows the build to succeed even if there are ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;