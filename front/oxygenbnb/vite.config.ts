import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    host: true,
    // port: 5173,
    port: 3000,
  },
  server: {
    host: true,
    // port: 3001
    port: 5173
  },
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@languages": path.resolve(__dirname, "./src/languages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  define: {
    'process.env': {}
  }
});
