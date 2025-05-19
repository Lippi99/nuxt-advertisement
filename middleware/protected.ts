import type { UserRole } from "~/types/role";

export default defineNuxtRouteMiddleware(async (to) => {
  // Avoid running on server-side navigation
  if (import.meta.server) return;

  const authStore = useAuthStore();
  await authStore.checkAuth();

  if (!authStore.user) {
    return navigateTo("/login");
  }

  if (!authStore.user.organization) {
    return navigateTo("/criar-organizacao");
  }

  const allowedRoles = to.meta.roles as UserRole[] | undefined;
  const userRole = authStore.user.role as UserRole;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return navigateTo("/unauthorized");
  }
});
