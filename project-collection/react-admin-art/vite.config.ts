import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";

import { viteMockServe } from "vite-plugin-mock";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteMockServe({
      mockPath: "src/mock", // mock数据存放的文件夹
      enable: true, // 是否启用 mock
      watchFiles: true, // 监听文件变化
      logger: true, // 显示日志
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
