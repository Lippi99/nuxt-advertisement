// types/nuxt.d.ts
import type { UserRole } from "./roles";

declare module "nuxt/schema" {
  interface PageMeta {
    roles?: UserRole[];
  }
}

export {};
