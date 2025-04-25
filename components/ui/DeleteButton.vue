<script lang="ts" setup>
import type { UserRole } from "~/types/role";

const props = defineProps<{
  onClick: VoidFunction;
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
    @click="onClick"
    color="error"
    class="max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950"
    >Excluir</UButton
  >
</template>
