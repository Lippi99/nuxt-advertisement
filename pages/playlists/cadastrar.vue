<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

useHead({
  title: "Cadastrar playlist",
});

definePageMeta({
  middleware: ["protected"],
  roles: ["admin"],
});

const schema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(4, "Must be at least 4 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
});

const isSubmitting = ref(false);

const { data } = await useFetch("/api/propagandas", {
  method: "GET",
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  try {
    await $fetch("/api/playlists", {
      method: "POST",
      body: {
        name: event.data.name,
      },
    });
    toast.add({
      title: "Success",
      description: "Playlist criado com sucesso",
      color: "success",
    });

    state.name = undefined;
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro na criação da playlist",
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
      <EditTitleAction title="Playlists" to="/playlists" />
    </slot>

    <FormContainer>
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormField label="Nome da playlist" name="name" required>
          <UInput
            size="lg"
            class="w-full mt-2"
            v-model="state.name"
            type="text"
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
