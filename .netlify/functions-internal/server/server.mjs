export { default } from "./main.mjs";
export const config = {
  name: "server handler",
  generator: "nuxt@3.17.0",
  path: "/*",
  nodeBundler: "none",
  includedFiles: ["**"],
  excludedPath: ["/.netlify/*","/_nuxt/builds/meta/*","/_nuxt/builds/*","/_fonts/*","/_nuxt/*"],
  preferStatic: true,
};