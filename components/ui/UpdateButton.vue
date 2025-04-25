<script lang="ts" setup>
import type { UserRole } from "~/types/role";

const props = defineProps<{
  to: string;
  role: UserRole[] | UserRole;
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
  <UButton
    v-if="permission"
    :to
    color="secondary"
    class="max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950"
    >Atualizar</UButton
  >
</template>
