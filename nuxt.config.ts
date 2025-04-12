// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: ["@nuxt/ui", "@nuxt/image", "@prisma/nuxt", "@pinia/nuxt"],
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
});
