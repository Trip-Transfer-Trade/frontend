import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9093',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '') //'/api' 부분을 제거하여 백엔드로 전달
      }
    }
  }
  build: {
    outDir: "build", // ✅ `dist/` 대신 `build/` 폴더로 생성
  },
});
