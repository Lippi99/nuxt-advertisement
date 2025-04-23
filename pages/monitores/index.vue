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
            color: row.original.paired ? "warning" : "neutral",
            onClick: () => {
              selectedEstabelecimento.value = row.original;
              if (row.original.paired) {
                isUnpairing.value = true;
              } else {
                isPairing.value = true;
              }
            },
          },
          () => (row.original.paired ? "Pareado" : "Parear")
        ),
      ]);
    },
  },
];

const result = ref(null);
const isValid = ref(undefined);
const isPairing = ref(false);

const isUnpairing = ref(false);
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

const unpairMonitorTitle = computed(
  () =>
    `Tem certeza que deseja desparear o monitor ${selectedEstabelecimento.value}?`
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

const onDetect = async ([firstDetectedCode]: any) => {
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
          paired: true,
        },
      });

      await refresh();
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

const handleUnpairMonitor = async () => {
  try {
    const { error } = await useFetch(
      `/api/monitores/setup/${selectedEstabelecimento.value?.code}`,
      {
        method: "PATCH",
        body: {
          monitorId: selectedEstabelecimento.value?.id,
          paired: false,
        },
      }
    );

    if (error.value?.statusCode == 400) {
      toast.add({
        title: "Erro",
        description: "Este monitor já foi pareado",
        color: "error",
      });

      return;
    }

    isUnpairing.value = false;

    await refresh();

    toast.add({
      title: "Sucesso",
      description: "Monitor deslogado com sucesso",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Erro",
      description: "Houve um erro ao desparear o monitor",
      color: "error",
    });
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

const facingMode = ref("environment");
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

    <UModal :title="unpairMonitorTitle" v-model:open="isUnpairing">
      <template #content>
        <div class="p-4 space-y-4">
          <h2 class="text-lg font-semibold">Confirmar despareamento</h2>
          <p>
            Tem certeza que deseja desparear o
            <strong>{{ selectedEstabelecimento?.name }}</strong
            >?
          </p>

          <div class="flex justify-between gap-2 mt-12">
            <UButton
              class="cursor-pointer"
              size="lg"
              color="neutral"
              @click="isUnpairing = false"
            >
              Cancelar
            </UButton>
            <UButton
              @click="handleUnpairMonitor"
              class="cursor-pointer"
              size="lg"
              color="primary"
            >
              Confirmar
            </UButton>
          </div>
        </div>
      </template>
    </UModal>

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
          :constraints="{
            facingMode,
          }"
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
