import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignoreExportsUsedInFile: true,
  ignore: ["handoff/**"],
  workspaces: {
    "apps/backend": {
      entry: [
        "medusa-config.ts",
        "instrumentation.ts",
        "src/api/**/*.ts",
        "src/subscribers/**/*.ts",
        "src/migration-scripts/**/*.ts",
        "src/admin/**/*.{ts,tsx}",
      ],
      ignore: ["jest.config.js"],
      // Medusa framework deps are used by the runtime/build system,
      // not imported directly in user code
      ignoreDependencies: [
        "@medusajs/admin-sdk",
        "@medusajs/admin-shared",
        "@medusajs/caching",
        "@medusajs/caching-redis",
        "@medusajs/dashboard",
        "@medusajs/draft-order",
        "@medusajs/ui",
        "@tanstack/react-query",
        "react-i18next",
        "react-router-dom",
        "ts-node",
        "zod",
        "@medusajs/file-s3",
        "resend",
      ],
    },
    "apps/storefront": {
      // Next.js plugin auto-detects entry points
      entry: ["next-sitemap.js"],
    },
  },
};

export default config;
