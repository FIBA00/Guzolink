/** Style: Market Ledger — Vite configuration keeps the production surface lean: React, Tailwind, and static-first PWA behavior. */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  root: "client",
  publicDir: "public",
  build: { outDir: "../dist/public", emptyOutDir: true },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["offline.html"],
      manifest: {
        name: "Guzolink Marketplace",
        short_name: "Guzolink",
        description: "A local marketplace for independent merchants and customers.",
        theme_color: "#d68a21",
        background_color: "#fbf7ee",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/manus-storage/guzolink-linked-market-mark_d6a14816.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/manus-storage/guzolink-linked-market-mark_d6a14816.png", sizes: "512x512", type: "image/png", purpose: "any" },
        ],
      },
      workbox: {
        navigateFallback: "/offline.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [],
      },
    }),
  ],
});
