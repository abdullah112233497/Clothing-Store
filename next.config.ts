import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**/image/**",
      },
    ],
  },
  webpack(config, { dev }) {
    // Keep production builds viable on constrained CI/developer disks.
    // This only disables webpack's build-time filesystem cache; runtime caching is unchanged.
    if (!dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
