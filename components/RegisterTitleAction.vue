<script lang="ts" setup>
import type { UserRole } from "~/types/role";

const props = defineProps<{
  title: string;
  to: string;
  role: UserRole | UserRole[];
}>();

const authStore = useAuthStore();

const userRole = authStore.user?.role as UserRole;
const permission = computed(() =>
  Array.isArray(props.role)
    ? props.role.includes(userRole)
    : userRole === props.role
);
</script>

<template>
  <div class="flex flex-wrap gap-3.5 items-center">
    <h1 class="text-4xl">{{ title }}</h1>
    <UButton
      v-if="permission"
      :to
      color="primary"
      class="cursor-pointer flex items-center justify-center max-w-[200px] py-3 w-full text-neutral-950"
      size="lg"
      label="Cadastrar"
    />
  </div>
</template>
