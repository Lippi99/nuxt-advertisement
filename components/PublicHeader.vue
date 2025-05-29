<script lang="ts" setup>
import { ref } from "vue";

const navigation = [
  { name: "Features", href: "#feature" },
  { name: "Produto", href: "#product" },
  { name: "Preço", href: "#pricing" },
  { name: "Sobre", href: "#about" },
];

const mobileMenuOpen = ref(false);
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 bg-zinc-900/60 backdrop-blur-md backdrop-saturate-150 border-b border-white/10"
  >
    <nav
      class="flex items-center justify-between p-6 px-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt=""
          />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="cursor-pointer -m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <UIcon name="i-lucide-menu" class="size-8" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          class="text-sm/6 font-semibold text-white"
        >
          {{ item.name }}
        </a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink
          target="_blank"
          to="/login"
          class="text-sm/6 font-semibold text-white"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="lg:hidden">
      <div
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        @click="mobileMenuOpen = false"
      />

      <div
        class="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-zinc-900 px-6 py-6 sm:ring-1 sm:ring-white/10"
      >
        <div class="flex items-center justify-between">
          <NuxtLink href="/" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img
              class="h-8 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt=""
            />
          </NuxtLink>
          <button
            type="button"
            class="cursor-pointer -m-2.5 rounded-md p-2.5 text-gray-400"
            @click="mobileMenuOpen = false"
          >
            <span class="sr-only">Close menu</span>
            <UIcon name="i-lucide-x" class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/25">
            <div class="space-y-2 py-6">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-gray-800"
              >
                {{ item.name }}
              </a>
            </div>
            <div class="py-6">
              <NuxtLink
                to="/login"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
              >
                Log in
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
