<script setup lang="ts">
useHead({
  title: "Index screen",
});

const auth = useAuthStore();
const { checkout } = useStripe();

const isAuthenticatedAndNotSubscribed = computed(
  () => auth.isAuthenticated && !auth.user?.isSubscribed
);
</script>

<template>
  <NuxtPwaManifest />
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <UModal
      v-model:open="isAuthenticatedAndNotSubscribed"
      :dismissible="false"
      :close="{ class: 'hidden' }"
    >
      <template #title>
        <h1 class="text-green-400 text-2xl">Ativar assinatura</h1>
      </template>

      <template #body>
        <p>
          Parabéns por ter criado sua conta. Agora, você precisa ativar sua
          assinatura para poder utilizá-lo.
        </p>
      </template>

      <template #footer>
        <div class="w-full flex justify-end">
          <UButton
            class="cursor-pointer"
            @click="checkout"
            size="lg"
            color="primary"
          >
            Realizar assinatura
          </UButton>
        </div>
      </template>
    </UModal>
  </UApp>
</template>
