import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      base: "/",

      manifest: {
        name: "Vinc",
        short_name: "Vinc",
        description:
          "usando NodeJs y VueJs.",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        orientation: "portrait",
        lang: "es",

      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        sourcemap: true,
      },
    })

  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/assets/scss/main.scss";         
        `
      }
    }
  }
})



// includeAssets: ["favicon.svg", "favicon.ico", "robots.txt", "apple-touch-icon.png"],
// icons: [
//   {
//     src: "pwa-192x192.png",
//     sizes: "192x192",
//     type: "image/png",
//   },
//   {
//     src: "pwa-512x512.png",
//     sizes: "512x512",
//     type: "image/png",
//   },
//   {
//     src: "pwa-512x512.png",
//     sizes: "512x512",
//     type: "image/png",
//     purpose: "any maskable",
//   },
// ],