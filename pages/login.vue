<script lang="ts" setup>
import type { TabsItem } from "@nuxt/ui";

useHead({
  title: "Login screen",
});

definePageMeta({
  middleware: ["guest"],
});

const tabs: TabsItem[] = [
  { label: "Admin", slot: "admin" },
  { label: "Monitor", slot: "monitor" },
];

const isRegister = ref(false);
</script>

<template>
  <main
    class="w-full max-w-screen min-h-screen flex flex-col items-center justify-center"
  >
    <UTabs :items="tabs" class="w-full max-w-md">
      <template #admin>
        <h1 class="text-4xl mb-6 mt-5">Welcome to login page!</h1>
        <template v-if="isRegister">
          <RegisterUser @back-to-login="isRegister = false" />
        </template>
        <LoginAdminEmployee @isRegister="isRegister = $event" v-else />
      </template>

      <template #monitor>
        <h1 class="text-4xl mb-6 mt-5">Welcome to monitor login page!</h1>

        <LoginMonitor />
      </template>
    </UTabs>
  </main>
</template>
