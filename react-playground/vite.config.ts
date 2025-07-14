import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
const resolve = (p: string) => path.resolve(process.cwd(), p);
console.log(resolve("./src/router"));
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve("./src"),
      "@modules": resolve("./modules"),
      "@assets": resolve("./src/assets"),
      "@components": resolve("./src/components"),
      "@constants": resolve("./src/constants"),
      "@router": resolve("./src/router"),
      "@shared": resolve("./src/shared"),
      "@store": resolve("./src/store"),
    },
  },
});
