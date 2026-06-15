import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.1.3'],
  serverExternalPackages: ['pdf-parse'],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
