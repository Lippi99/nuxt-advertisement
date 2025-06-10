// https://nuxt.com/docs/api/configuration/nuxt-config

const sw = process.env.SW === "true";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  nitro: {
    preset: "digital-ocean",
  },
  devtools: { enabled: true },
  ssr: true,

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-qrcode",
    "@vite-pwa/nuxt",
    "@unlok-co/nuxt-stripe",
    "@nuxt/fonts",
  ],

  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    dbHost: (process.env.DB_HOST as string) || "",
    dbPort: (process.env.DB_PORT as string) || "",
    dbUser: (process.env.DB_USER as string) || "",
    dbPassword: (process.env.DB_PASSWORD as string) || "",
    dbName: (process.env.DB_NAME as string) || "",

    awsAccessKey: process.env.AWS_ACCESS_KEY || "",
    awsSecretKey: process.env.AWS_SECRET_KEY || "",
    awsBucketName: process.env.AWS_BUCKET_NAME || "",
    awsRegion: process.env.AWS_REGION || "",

    jwtSecret: process.env.JWT_SECRET || "",
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    stripeProductBasic: process.env.STRIPE_PRODUCT_BASIC || "",
    stripeProductPremium: process.env.STRIPE_PRODUCT_PREMIUM || "",
    stripeWebhookSecretKey: process.env.STRIPE_WEBHOOK_SECRET_KEY || "",
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

  fonts: {
    defaults: {
      weights: [400],
      styles: ["normal", "italic"],
      subsets: [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
      ],
    },
  },
  stripe: {
    client: {
      key: process.env.STRIPE_CLIENT_KEY || "",
    },
    server: {
      key: process.env.STRIPE_SECRET_KEY || "",
    },
  },
});
