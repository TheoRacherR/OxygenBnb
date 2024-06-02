import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
    host: true,
    port: 5173,
  },
  server: {
    host: true,
    // port: 3001
    port: 5173
  }
});
