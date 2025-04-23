<script lang="ts" setup>
import { ref, onMounted } from "vue";

const code = ref<string | null>(null);
const router = useRouter();

onMounted(async () => {
  const storedCode = localStorage.getItem("monitor-code");

  if (storedCode) {
    code.value = storedCode;
    listenForPairing(storedCode);
  } else {
    const { data } = await useFetch("/api/monitores/setup", { method: "POST" });
    if (data.value?.code) {
      code.value = data.value.code;
      localStorage.setItem("monitor-code", data.value.code);
      listenForPairing(data.value.code);
    }
  }
});

function listenForPairing(code: string) {
  const source = new EventSource(`/api/propagandas/assistir/pareado/${code}`);

  source.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.paired) {
      localStorage.removeItem("monitor-code");
      source.close();
      router.push(`/monitores/assistir/${code}`);
    }
  };

  source.onerror = (err) => {
    console.error("SSE error:", err);
    source.close();
  };
}
</script>

<template>
  <Qrcode class="max-w-[448px] w-full h-[273px]" :value="code ?? ''" />
</template>
