// vite.config.js
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
	root: "client",
	publicDir: "public",
	base: mode === "production" ? "/guzolink/" : "/",
	build: {
		outDir: "../dist/public",
		emptyOutDir: true,
		sourcemap: true, // or 'hidden' if you don't want them referenced in the JS but still generated
	},
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["offline.html"],
			manifest: {
				name: "Guzolink Marketplace",
				short_name: "Guzolink",
				description:
					"A local marketplace for independent merchants and customers.",
				theme_color: "#d68a21",
				background_color: "#fbf7ee",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "/public/img/guzolink-linked-market-mark_d6a14816.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/public/img/guzolink-linked-market-mark_d6a14816.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
				],
			},
			workbox: {
				navigateFallback: "/offline.html",
				globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
				runtimeCaching: [],
			},
		}),
	],
}));
