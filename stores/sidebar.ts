import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const isSidebarOpen = ref(false);

  function handleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }

  return {
    isSidebarOpen,
    handleSidebar,
  };
});
