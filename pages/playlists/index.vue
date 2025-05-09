<script lang="ts" setup>
useHead({
  title: "Playlists",
});

definePageMeta({
  middleware: ["protected"],
  roles: ["admin", "employee"],
});

import { getPaginationRowModel } from "@tanstack/vue-table";
import type { TableColumn } from "@nuxt/ui";
import dayjs from "dayjs";
import type { Estabelecimento } from "~/types/establishment";
import type { Monitor } from "~/types/monitor";
import UpdateButton from "~/components/ui/UpdateButton.vue";
import DeleteButton from "~/components/ui/DeleteButton.vue";

const toast = useToast();
const table = useTemplateRef("table");

const UButton = resolveComponent("UButton");

const { data, status, refresh } = await useFetch("/api/playlists", {
  method: "GET",
});

const columns: TableColumn<Monitor | any>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },

  {
    accessorKey: "created_at",
    header: "Criado em",
    cell: (value) =>
      `${dayjs(value.renderValue() as string).format("DD/MM/YYYY")}`,
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return h("div", { class: "flex gap-3.5" }, [
        h(UpdateButton, {
          role: ["admin"],
          to: `/playlists/${row.original.id}`,
        }),
        h(DeleteButton, {
          role: ["admin"],
          onClick: () => {
            console.log("smth happened");
            selectedAdvertisement.value = row.original;
            isDeleteModalOpen.value = true;
          },
        }),
      ]);
    },
  },
];

const isDeleteModalOpen = ref(false);
const selectedAdvertisement = ref<Estabelecimento | null>(null);
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});

const deleteTitle = computed(
  () =>
    `Tem certeza que deseja excluir a propaganda ${selectedAdvertisement.value}?`
);

const handleDeleteAdvertisement = async () => {
  const id = selectedAdvertisement.value?.id;
  try {
    await $fetch(`/api/playlists/${id}`, {
      method: "DELETE",
    });

    isDeleteModalOpen.value = false;
    await refresh();
    toast.add({
      title: "Sucesso",
      description: "Propaganda excluída com sucesso",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro ao excluir a propaganda",
      color: "error",
    });
  }
};
</script>

<template>
  <NuxtLayout name="admin-authenticated">
    <slot name="header">
      <RegisterTitleAction
        to="/playlists/cadastrar"
        title="Playlists"
        role="admin"
      />
    </slot>
    <div class="w-full space-y-4 pb-4 mt-12">
      <UTable
        ref="table"
        :loading="status === 'pending'"
        v-model:pagination="pagination"
        :data="data?.playlists"
        :columns="columns"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel(),
        }"
        class="flex-1"
      />

      <div class="flex justify-center border-t border-(--ui-border) pt-12">
        <UPagination
          show-edges
          class="cursor-pointer"
          size="lg"
          :default-page="
            (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
          "
          :items-per-page="table?.tableApi?.getState().pagination.pageSize"
          :total="table?.tableApi?.getFilteredRowModel().rows.length"
          @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>

    <UModal :title="deleteTitle" v-model:open="isDeleteModalOpen">
      <template #content>
        <div class="p-4 space-y-4">
          <h2 class="text-lg font-semibold">Confirmar exclusão</h2>
          <p>
            Tem certeza que deseja excluir
            <strong>{{ selectedAdvertisement?.name }}</strong
            >?
          </p>

          <div class="flex justify-between gap-2 mt-12">
            <UButton
              class="cursor-pointer"
              size="lg"
              color="neutral"
              @click="isDeleteModalOpen = false"
            >
              Cancelar
            </UButton>
            <UButton
              @click="handleDeleteAdvertisement"
              class="cursor-pointer"
              size="lg"
              color="error"
            >
              Confirmar
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </NuxtLayout>
</template>
