import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://192.168.1.43:5180",
        changeOrigin: true,
      },
      "/graphql": {
        target: "http://192.168.1.43:5180",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
  },
  plugins: [react()],
});
