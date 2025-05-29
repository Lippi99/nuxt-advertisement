<script lang="ts" setup>
import type { TabsItem } from "@nuxt/ui";

useSeoMeta({
  title: "Tela de login",
  ogTitle: "Tela de login",
});

definePageMeta({
  middleware: ["guest"],
});

const route = useRoute();

const tabs: TabsItem[] = [
  { label: "Admin", slot: "admin" },
  { label: "Monitor", slot: "monitor" },
];

const isRegister = ref(route.query.register === "true");
</script>

<template>
  <main
    class="w-full max-w-screen min-h-screen flex flex-col items-center justify-center"
  >
    <UTabs :items="tabs" class="w-full max-w-md">
      <template #admin>
        <h1 class="text-4xl mb-6 mt-5">Bem vindo a tela de login</h1>
        <template v-if="isRegister">
          <RegisterUser @back-to-login="isRegister = false" />
        </template>
        <LoginAdminEmployee @isRegister="isRegister = $event" v-else />
      </template>

      <template #monitor>
        <h1 class="text-4xl mb-6 mt-5">Bem vindo a tela de login do monitor</h1>

        <LoginMonitor />
      </template>
    </UTabs>
  </main>
</template>
