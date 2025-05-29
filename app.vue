<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: "pt",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/icons/logo.png",
    },
  ],
});

const auth = useAuthStore();
const { checkout } = useStripe();

const showSubscriptionModal = computed<boolean>(
  () =>
    !!(
      auth.isAuthenticated &&
      auth.user?.organization &&
      !auth.user.isSubscribed
    )
);
</script>

<template>
  <NuxtPwaManifest />
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />

    <UModal
      v-model:open="showSubscriptionModal"
      :dismissible="false"
      :close="{ class: 'hidden' }"
    >
      <template #title>
        <h1 class="text-green-400 text-2xl">Ativar assinatura</h1>
      </template>

      <template #body>
        <p>Você precisa ativar sua assinatura para poder utilizá-lo.</p>
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
