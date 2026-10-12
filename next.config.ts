import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Lets a verification build use its own folder (NEXT_DIST_DIR=.next-check) so it never
  // overwrites the .next folder a running `npm run dev` is serving from.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
