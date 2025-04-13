<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

definePageMeta({
  middleware: ["protected"],
});

const route = useRoute();

const id = computed(() => route.params.id);

const schema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(4, "Must be at least 4 characters"),

  establishmentId: z
    .number({ message: "Campo obrigatório" })
    .int({ message: "Campo obrigatório" }),

  playlistId: z.number().int().optional(),
});

type Schema = z.output<typeof schema>;

const { data } = await useFetch(`/api/monitores/${id.value}`, {
  method: "GET",
});

const { data: estabelecimentos } = await useFetch("/api/estabelecimentos", {
  method: "GET",
});

const { data: playlists } = await useFetch("/api/playlists", {
  method: "GET",
});

const title = ref(data.value?.monitor?.name || "");

watchEffect(() => {
  useHead({
    title: `${title.value} | Nuxt advertisement`,
  });
});

const state = reactive<Partial<Schema>>({
  name: data.value?.monitor?.name || undefined,
  establishmentId: data?.value?.monitor?.establishmentId || undefined,
  playlistId: data?.value?.monitor.playlistId || undefined,
});

const isSubmitting = ref(false);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  try {
    await $fetch(`/api/monitores/${id.value}`, {
      method: "PATCH",
      body: {
        name: event.data.name,
        establishmentId: event.data.establishmentId,
        playlistId: event.data.playlistId,
      },
    });

    title.value = event.data.name;

    toast.add({
      title: "Success",
      description: "Monitor atualizado com sucesso",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro na atualização do monitor",
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <NuxtLayout name="admin-authenticated">
    <slot name="header">
      <EditTitleAction title="Editar monitor" to="/monitores" />
    </slot>

    <FormContainer>
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormField label="Nome do monitor" name="name" required>
          <UInput
            size="lg"
            class="w-full mt-2"
            v-model="state.name"
            type="text"
          />
        </UFormField>

        <UFormField
          class="mt-8"
          label="Nome do estabelecimento"
          name="establishmentId"
          required
        >
          <USelect
            size="lg"
            v-model="state.establishmentId"
            :items="estabelecimentos?.estabelecimentos"
            label-key="name"
            value-key="id"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            class="w-full mt-2"
          />
        </UFormField>

        <UFormField class="mt-8" label="Nome da playlist" name="playlistId">
          <USelect
            size="lg"
            v-model="state.playlistId"
            :items="playlists?.playlists"
            label-key="name"
            value-key="id"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            class="w-full mt-2"
          />
        </UFormField>

        <div class="flex items-center justify-center">
          <UButton
            :disabled="isSubmitting"
            :loading="isSubmitting"
            class="cursor-pointer py-2.5 mt-8 max-w-xs w-full flex items-center justify-center"
            type="submit"
            >Atualizar</UButton
          >
        </div>
      </UForm>
    </FormContainer>
  </NuxtLayout>
</template>
