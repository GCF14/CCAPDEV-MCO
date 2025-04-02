import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true, // allows SVGs
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows all https images
      },
      {
        protocol: "http",
        hostname: "**", // allows all http images 
      },
    ],
  },
};

export default nextConfig;
