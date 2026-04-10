import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",

  // GitHub Pages serves from /tracepointspb subdirectory in production.
  // Leave empty for a custom domain at root.
  basePath: isProd ? "/tracepointspb" : "",

  // next/image requires a loader when using static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
