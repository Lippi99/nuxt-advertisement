<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

useHead({
  title: "Propagandas",
});

definePageMeta({
  middleware: ["guest"],
});

// Fetch data

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const { data: propagandas } = await useFetch(
  `/api/propagandas/assistir/${id}`,
  { method: "GET" }
);

const allImages = computed(() => {
  const ads =
    propagandas.value?.monitor?.monitor?.playlist?.advertisements || [];
  return ads.flatMap((ad) => ad.images ?? []);
});

const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

function listenForPairing() {
  const source = new EventSource(`/api/propagandas/assistir/pareado/${id}`);

  source.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (!data.paired) {
      source.close();
      router.push("/login");
    }
  };

  source.onerror = (err) => {
    console.error("SSE error:", err);
    source.close();
  };
}

onMounted(() => {
  listenForPairing();
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
