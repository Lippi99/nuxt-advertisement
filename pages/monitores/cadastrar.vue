<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

useHead({
  title: "Cadastrar monitor",
});

definePageMeta({
  middleware: ["protected"],
});

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

const state = reactive<Partial<Schema>>({
  name: undefined,
  establishmentId: undefined,
  playlistId: undefined,
});

const isSubmitting = ref(false);

const toast = useToast();

const { data } = await useFetch("/api/estabelecimentos", {
  method: "GET",
});

const { data: playlists } = await useFetch("/api/playlists", {
  method: "GET",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  try {
    await $fetch("/api/monitores", {
      method: "POST",
      body: {
        name: event.data.name,
        establishmentId: event.data.establishmentId,
        playlistId: event.data.playlistId,
      },
    });
    toast.add({
      title: "Success",
      description: "Monitor criado com sucesso",
      color: "success",
    });

    state.name = undefined;
    state.establishmentId = undefined;
    state.playlistId = undefined;
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro na criação do monitor",
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
      <EditTitleAction title="Monitores" to="/monitores" />
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
            :items="data?.estabelecimentos"
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
            >Cadastrar</UButton
          >
        </div>
      </UForm>
    </FormContainer>
  </NuxtLayout>
</template>
