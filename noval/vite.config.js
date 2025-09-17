import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import path from "path";

// https://vite.dev/config/
console.log("Vite 配置中读取的环境变量：", {
  url: process.env.VITE_MOONSHOT_CHAT_URL,
  key: process.env.VITE_MOONSHOT_API_KEY
});
export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});