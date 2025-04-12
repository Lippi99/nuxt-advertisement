<script lang="ts" setup>
useHead({
  title: "Usuários",
});

definePageMeta({
  middleware: ["protected"],
});

import { getPaginationRowModel } from "@tanstack/vue-table";
import type { TableColumn } from "@nuxt/ui";
import dayjs from "dayjs";

import type { User } from "~/types/user";

const toast = useToast();
const table = useTemplateRef("table");

const UButton = resolveComponent("UButton");

const { data, status, refresh } = await useFetch("/api/usuarios", {
  method: "GET",
});

const columns: TableColumn<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "lastName",
    header: "Sobrenome",
  },

  {
    accessorKey: "email",
    header: "E-mail",
  },
  {
    accessorKey: "createdAt",
    header: "Criado em",
    cell: (value) =>
      `${dayjs(value.renderValue() as string).format("DD/MM/YYYY")}`,
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      return h("div", { class: "flex gap-3.5" }, [
        h(
          UButton,
          {
            class:
              "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950",
            color: "secondary",
            to: `/usuarios/${row.original.id}`,
          },
          () => "Atualizar"
        ),
        h(
          UButton,
          {
            class:
              "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950",
            color: "error",
            onClick: () => {
              console.log("smth happened");
              selectedUser.value = row.original;
              isDeleteModalOpen.value = true;
            },
          },
          () => "Excluir"
        ),
      ]);
    },
  },
];

const isDeleteModalOpen = ref(false);
const selectedUser = ref<User | null>(null);
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});

const deleteTitle = computed(
  () => `Tem certeza que deseja excluir o usuário ${selectedUser.value}?`
);

const handleDeleteUser = async () => {
  const id = selectedUser.value?.id;
  try {
    await $fetch(`/api/usuarios/${id}`, {
      method: "DELETE",
    });

    isDeleteModalOpen.value = false;
    await refresh();
    toast.add({
      title: "Sucesso",
      description: "Usuário excluído com sucesso",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro ao excluir o usuário",
      color: "error",
    });
  }
};
</script>

<template>
  <NuxtLayout name="admin-authenticated">
    <slot name="header">
      <RegisterTitleAction to="/usuarios/cadastrar" title="Usuários" />
    </slot>
    <div class="w-full space-y-4 pb-4 mt-12">
      <UTable
        ref="table"
        :loading="status === 'pending'"
        v-model:pagination="pagination"
        :data="data?.usuarios"
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
            <strong>{{ selectedUser?.name }}</strong
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
              @click="handleDeleteUser"
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
