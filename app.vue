<script setup lang="ts">
useHead({
  title: "Index screen",
});
</script>

<template>
  <NuxtPwaManifest />
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </UApp>
</template>
