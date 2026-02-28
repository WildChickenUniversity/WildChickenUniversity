import createMDX from "@next/mdx";
import { execSync } from "child_process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    mdxRs: false,
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_GIT_COMMIT: execSync("git rev-parse --short HEAD")
      .toString()
      .trim(),
  },
};

const withMDX = createMDX({
  options: {
    rehypePlugins: ["rehype-slug"],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
