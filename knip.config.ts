import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: ["handoff/**"],
  workspaces: {
    "apps/backend": {
      entry: [
        "medusa-config.ts",
        "instrumentation.ts",
        "src/modules/**/index.ts",
        "src/api/**/*.ts",
        "src/workflows/**/*.ts",
        "src/subscribers/**/*.ts",
        "src/links/**/*.ts",
        "src/jobs/**/*.ts",
        "src/migration-scripts/**/*.ts",
        "src/admin/**/*.{ts,tsx}",
      ],
      ignore: [".medusa/**", "src/**/*.test.ts", "jest.config.js"],
      // Medusa framework deps are used by the runtime/build system,
      // not imported directly in user code
      ignoreDependencies: [
        "@medusajs/admin-sdk",
        "@medusajs/admin-shared",
        "@medusajs/caching",
        "@medusajs/caching-redis",
        "@medusajs/dashboard",
        "@medusajs/draft-order",
        "@medusajs/medusa",
        "@medusajs/ui",
        "@tanstack/react-query",
        "react-i18next",
        "react-router-dom",
        "zod",
      ],
    },
    "apps/storefront": {
      // Next.js plugin auto-detects entry points
      entry: ["next-sitemap.js"],
      ignore: [".next/**"],
    },
  },
};

export default config;
