<script lang="ts" setup>
defineProps<{
  feature: {
    name: string;
    description: string;
    href: string;
    icon: string;
  };
}>();
</script>

<template>
  <dt class="flex items-center gap-x-3 text-base/7 font-semibold">
    <UIcon v-if="feature.icon" :name="feature.icon" />
    <component :is="feature.icon" class="size-5 flex-none" aria-hidden="true" />
    {{ feature.name }}
  </dt>
  <dd class="mt-4 flex flex-auto flex-col text-base/7">
    <p class="flex-auto">{{ feature.description }}</p>
  </dd>
</template>
