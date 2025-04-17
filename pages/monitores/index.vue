<script lang="ts" setup>
useHead({
  title: "Monitores",
});

definePageMeta({
  middleware: ["protected"],
  roles: ["admin", "employee"],
});

import { getPaginationRowModel } from "@tanstack/vue-table";
import type { TableColumn } from "@nuxt/ui";
import dayjs from "dayjs";
import type { Monitor } from "~/types/monitor";

const toast = useToast();
const table = useTemplateRef("table");

const UButton = resolveComponent("UButton");

const { data, status, refresh } = await useFetch("/api/monitores", {
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
    accessorFn: (row) => row.establishment?.name ?? "Sem nome",
    id: "establishment",
    header: "Estabelecimento",
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
            to: `/monitores/${row.original.id}`,
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
              selectedEstabelecimento.value = row.original;
              isDeleteModalOpen.value = true;
            },
          },
          () => "Excluir"
        ),

        h(
          UButton,
          {
            class:
              "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950",
            color: "neutral",
            onClick: () => {
              selectedEstabelecimento.value = row.original;

              isPairing.value = true;
            },
          },
          () => "Parear"
        ),
      ]);
    },
  },
];

const result = ref(null);
const isValid = ref(undefined);
const isPairing = ref(false);
const paused = ref(false);

const isDeleteModalOpen = ref(false);
const selectedEstabelecimento = ref<Monitor | null>(null);
const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});

const deleteTitle = computed(
  () =>
    `Tem certeza que deseja excluir o monitor ${selectedEstabelecimento.value}?`
);

const handleDeleteEstablishment = async () => {
  const id = selectedEstabelecimento.value?.id;
  console.log(selectedEstabelecimento);
  try {
    await $fetch(`/api/monitores/${id}`, {
      method: "DELETE",
    });

    isDeleteModalOpen.value = false;
    await refresh();
    toast.add({
      title: "Sucesso",
      description: "Estabelecimento excluído com sucesso",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro ao excluir o estabelecimento",
      color: "error",
    });
  }
};

const timeout = (ms: number) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
};

const onDetect = async ([firstDetectedCode]) => {
  try {
    result.value = firstDetectedCode.rawValue;
    paused.value = true;
    await timeout(2000);
    isValid.value = result.value?.startsWith("http");

    if (result?.value) {
      await useFetch(`/api/monitores/setup/${result.value as string}`, {
        method: "PATCH",
        body: {
          monitorId: selectedEstabelecimento.value?.id,
        },
      });
    }
    toast.add({
      title: "Sucesso",
      description: "Monitor logado com sucesso",
      color: "success",
    });
  } catch (error) {
    console.log(error);
    toast.add({
      title: "Erro",
      description: "Houve um erro ao logar o monitor",
      color: "error",
    });
  } finally {
    await timeout(2000);
    paused.value = false;
  }
};

const resetValidationState = computed(() => {
  return (isValid.value = undefined);
});

const validationPending = computed(() => {
  return isValid.value === undefined && paused.value;
});

const validationSuccess = computed(() => {
  return isValid.value === true;
});

const validationFailure = computed(() => {
  return isValid.value === false;
});
</script>

<template>
  <NuxtLayout name="admin-authenticated">
    <slot name="header">
      <RegisterTitleAction to="/monitores/cadastrar" title="Monitores" />
    </slot>
    <div class="w-full space-y-4 pb-4 mt-12">
      <UTable
        ref="table"
        :loading="status === 'pending'"
        v-model:pagination="pagination"
        :data="data?.monitores"
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
            <strong>{{ selectedEstabelecimento?.name }}</strong
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
              @click="handleDeleteEstablishment"
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

    <UModal class="w-11/12" v-model:open="isPairing">
      <template #content>
        <qrcode-stream
          :paused="paused"
          @detect="onDetect"
          @error="console.error"
          @camera-on="resetValidationState"
        >
          <div v-if="validationSuccess" class="validation-success">
            This is a URL
          </div>

          <div v-if="validationFailure" class="validation-failure">
            This is NOT a URL!
          </div>

          <div v-if="validationPending" class="validation-pending">
            Long validation in progress...
          </div>
        </qrcode-stream>
      </template>
    </UModal>
  </NuxtLayout>
</template>
