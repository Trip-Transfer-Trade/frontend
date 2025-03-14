import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Trip Transfer Trade",
        short_name: "TTT",
        theme_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/icons/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
        ]

      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        //target: 'https://triptransfertrade.shop',
         baseURL: "http://localhost:8080/api",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: "build", // ✅ `dist/` 대신 `build/` 폴더로 생성
  },
});
