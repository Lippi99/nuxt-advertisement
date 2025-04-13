import { defineStore } from "pinia";
import type { User } from "~/server/models/user";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
      this.isAuthenticated = true;
    },

    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    async login(email: string, password: string) {
      try {
        const response = await $fetch("/api/auth/login", {
          method: "POST",
          body: { email, password },
        });

        if (response?.user) {
          this.setUser(response?.user);
        }

        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    async logout() {
      try {
        const token = useCookie("ad-auth");
        if (!token) return;
        await $fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });
        console.log("token", token.value);
        token.value = null;
      } catch {
        console.log("erro interno");
      } finally {
        this.clearAuth();
        await navigateTo("/login");
      }
    },

    async checkAuth() {
      try {
        const token = useCookie("ad-auth");
        if (!token) return false;

        const response = await $fetch("/api/auth/me");

        this.setUser(response?.user as User);
        return true;
      } catch {
        this.clearAuth();
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
