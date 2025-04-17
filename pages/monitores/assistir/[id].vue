<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

definePageMeta({
  middleware: ["guest"],
});

// Fetch data
const { data: propagandas } = await useFetch(
  `/api/propagandas/assistir/46eae1db-0058-49c7-86e2-7c3d1e5aead7`,
  { method: "GET" }
);

const allImages = computed(() => {
  const ads =
    propagandas.value?.monitor?.monitor?.playlist?.advertisements || [];
  return ads.flatMap((ad) => ad.images ?? []);
});

const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  intervalId = setInterval(() => {
    if (allImages.value.length > 0) {
      currentIndex.value = (currentIndex.value + 1) % allImages.value.length;
    }
  }, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <div
    v-if="allImages.length"
    class="w-screen h-screen relative overflow-hidden"
  >
    <NuxtImg
      :src="allImages[currentIndex]?.url"
      class="absolute top-0 left-0 w-full h-full object-cover blur-xl scale-110 z-0 transition-all duration-700"
      alt="Background"
    />

    <div class="relative z-10 w-full h-full flex items-center justify-center">
      <NuxtImg
        :src="allImages[currentIndex]?.url"
        class="max-w-full max-h-full object-contain transition-all duration-700"
        alt="Slideshow"
      />
    </div>
  </div>
</template>
