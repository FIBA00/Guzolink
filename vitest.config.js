/** Style: Market Ledger — feature tests are scoped to the implemented client and merchant-upload route, excluding unused template tests. */
import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  test: {
    environment: "node",
    environmentMatchGlobs: [["client/src/**/*.test.jsx", "jsdom"]],
    include: ["client/src/**/*.test.{js,jsx}", "server/mediaUpload.test.ts"],
  },
});
