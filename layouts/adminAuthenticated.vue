<script lang="ts" setup>
import { useSidebarStore } from "~/stores/sidebar";
import AuthSidebar from "~/components/AuthSidebar.vue";

const { handleSidebar } = useSidebarStore();
</script>

<template>
  <div class="flex min-h-screen overflow-y-hidden">
    <AuthSidebar />

    <main class="relative flex-1 ml-0 md:ml-12 py-5">
      <button
        type="button"
        class="cursor-pointer p-4 md:hidden text-white"
        @click="handleSidebar"
      >
        <UIcon class="text-4xl" name="i-heroicons-bars-3" />
      </button>

      <div class="px-4 mt-11">
        <slot name="#header" />
        <slot />
      </div>
    </main>
  </div>
</template>
