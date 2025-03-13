import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://52.78.46.146:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: "build", // ✅ `dist/` 대신 `build/` 폴더로 생성
  },
});
