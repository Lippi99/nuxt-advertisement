// https://nuxt.com/docs/api/configuration/nuxt-config

const sw = process.env.SW === "true";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",

  devtools: { enabled: true },
  ssr: true,
  nitro: {
    preset: "cloudflare-pages",
    prerender: {
      failOnError: false,
    },
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
    strategies: sw ? "injectManifest" : "generateSW",
    srcDir: sw ? "service-worker" : undefined,
    filename: sw ? "sw.ts" : undefined,
    registerType: "autoUpdate",
    manifest: {
      name: "Nuxt Advertisement PWA",
      short_name: "NuxtAdPwa",
      theme_color: "#ffffff",
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
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    injectManifest: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },

    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
  },
});
