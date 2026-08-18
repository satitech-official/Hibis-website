import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? "/Hibis-website" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
