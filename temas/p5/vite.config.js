import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3002",
				changeOrigin: true,
			},
		},
	},
	test: {
		environment: "jsdom",
		globals: true, // evita tener que importar describe, test y expect en cada fichero de test si usamos biome ver javascript.globals
		setupFiles: "./testSetup.js",
	},
});
