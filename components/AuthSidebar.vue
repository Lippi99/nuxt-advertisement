<script lang="ts" setup>
import { useSidebarStore } from "~/stores/sidebar";

const sidebarStore = useSidebarStore();
</script>

<template>
  <!-- Sidebar container -->
  <div
    :class="
      cn(
        'bg-neutral-900 text-white w-64 fixed md:relative md:translate-x-0 transform -translate-x-full md:transform-none transition-transform duration-300 ease-in-out z-50 h-screen',
        {
          'translate-x-0': sidebarStore.isSidebarOpen,
        }
      )
    "
  >
    <button
      type="button"
      class="absolute top-4 right-4 text-white md:hidden"
      @click="sidebarStore.isSidebarOpen = false"
    >
      <UIcon class="text-3xl" name="i-heroicons-x-mark" />
    </button>

    <!-- Sidebar content -->
    <div class="py-5 h-full mt-8 flex flex-col">
      <h1 class="text-center mt-4 text-2xl">Bem vindo, Felipe</h1>
      <ul class="mt-4 text-lg flex-1">
        <li>
          <NuxtLink
            exactActiveClass="text-primary-400"
            class="w-full h-full inline-block pl-7 py-3.5 text-neutral-400"
            to="/estabelecimentos"
          >
            Estabelecimentos
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            exactActiveClass="text-primary-400"
            class="w-full h-full inline-block pl-7 py-3.5 text-neutral-400"
            to="/monitores"
          >
            Monitores
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            exactActiveClass="text-primary-400"
            class="w-full h-full inline-block pl-7 py-3.5 text-neutral-400"
            to="/propagandas"
          >
            Propagandas
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>

  <!-- Overlay for mobile -->
  <div
    v-if="sidebarStore.isSidebarOpen"
    class="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
    @click="sidebarStore.isSidebarOpen = false"
  ></div>
</template>
