// https://nuxt.com/docs/api/configuration/nuxt-config

const sw = process.env.SW === "true";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@prisma/nuxt",
    "@pinia/nuxt",
    "nuxt-qrcode",
    "@vite-pwa/nuxt",
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    awsAccessKey: "",
    awsSecretKey: "",
    awsBucketName: "",
    awsRegion: "",
    jwtSecret: "",
  },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
  pwa: {
    registerType: "autoUpdate",
    includeAssets: ["favicon.ico", "apple-touch-icon.png", "icons/*"],
    manifest: {
      name: "My Awesome App",
      short_name: "AwesomeApp",
      description: "My Nuxt 3 PWA!",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          src: "/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
});
