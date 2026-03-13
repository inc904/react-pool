import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "src/mock",
      enable: true,
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
