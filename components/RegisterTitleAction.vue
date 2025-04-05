<script lang="ts" setup>
defineProps<{
  title: string;
  to: string;
}>();
</script>

<template>
  <div class="flex flex-wrap gap-3.5 items-center">
    <h1 class="text-4xl">{{ title }}</h1>
    <UButton
      :to
      color="primary"
      class="cursor-pointer flex items-center justify-center max-w-[200px] py-3 w-full text-neutral-950"
      size="lg"
      label="Cadastrar"
    />
  </div>
</template>
