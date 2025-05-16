<script lang="ts" setup>
import { useSidebarStore } from "~/stores/sidebar";

const sidebarStore = useSidebarStore();
const authStore = useAuthStore();

const route = useRoute();

const includesPrefix = (routeName: string) =>
  route.name?.toString().startsWith(routeName);

const handleLogout = async () => {
  await authStore.logout();
};

const welcomeUser = computed(() => `Bem vindo(a), ${authStore.user?.name}`);
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
    <div class="py-5 h-full mt-8 flex flex-col relative">
      <h1 class="text-center text-xl">{{ welcomeUser }}</h1>
      <ul class="mt-4 text-lg">
        <li v-if="authStore.user?.role === 'admin'">
          <NuxtLink
            :class="[
              'w-full h-full inline-block pl-7 py-3.5 text-neutral-400',
              { 'text-primary-400': includesPrefix('usuarios') },
            ]"
            to="/usuarios"
          >
            Usuários
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="[
              'w-full h-full inline-block pl-7 py-3.5 text-neutral-400',
              { 'text-primary-400': includesPrefix('estabelecimentos') },
            ]"
            to="/estabelecimentos"
          >
            Estabelecimentos
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="[
              'w-full h-full inline-block pl-7 py-3.5 text-neutral-400',
              { 'text-primary-400': includesPrefix('monitores') },
            ]"
            class="w-full h-full inline-block pl-7 py-3.5 text-neutral-400"
            to="/monitores"
          >
            Monitores
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            :class="[
              'w-full h-full inline-block pl-7 py-3.5 text-neutral-400',
              { 'text-primary-400': includesPrefix('propagandas') },
            ]"
            class="w-full h-full inline-block pl-7 py-3.5 text-neutral-400"
            to="/propagandas"
          >
            Propagandas
          </NuxtLink>
        </li>

        <li>
          <NuxtLink
            :class="[
              'w-full h-full inline-block pl-7 py-3.5 text-neutral-400',
              { 'text-primary-400': includesPrefix('playlists') },
            ]"
            class="w-full h-full inline-block pl-7 py-3.5 text-neutral-400"
            to="/playlists"
          >
            Playlists
          </NuxtLink>
        </li>
      </ul>
      <div class="absolute left-18 right-0 bottom-20">
        <button type="button" @click="handleLogout">
          <UTooltip :delay-duration="0" text="Sair">
            <UIcon
              class="cursor-pointer size-6 text-red-500"
              name="i-lucide-log-out"
            />
          </UTooltip>
        </button>
      </div>
    </div>
  </div>

  <!-- Overlay for mobile -->
  <div
    v-if="sidebarStore.isSidebarOpen"
    class="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
    @click="sidebarStore.isSidebarOpen = false"
  ></div>
</template>
