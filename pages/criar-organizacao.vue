<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

definePageMeta({
  layout: false,
});

useSeoMeta({
  title: "Cadastre uma organização",
  ogTitle: "Cadastre uma organização",
});

const schema = z.object({
  organization: z
    .string({ message: "Nome da organização é obrigatório!" })
    .min(1, { message: "Nome da organização é obrigatório!" })
    .trim(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  organization: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/api/organizacoes", {
      method: "POST",
      body: {
        organization: event.data.organization,
      },
    });

    await navigateTo("/estabelecimentos");
  } catch (error) {
    toast.add({
      title: "error",
      description: "Houve um erro ao criar a organização",
      color: "error",
    });
  }
}

const data = await useFetch("/api/auth/me");

if (data.data.value?.user?.organization !== null) {
  await navigateTo("/estabelecimentos");
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center px-4">
    <div class="text-center max-w-xl space-y-6">
      <h1 class="text-5xl font-bold">Bem-vindo ao Painel de Anúncios!</h1>
      <p class="text-lg text-justify">
        Este aplicativo permite gerenciar e exibir propagandas em telas
        digitais. Cadastre estabelecimentos, configure monitores e organize
        campanhas com playlists de anúncios dinâmicos.
      </p>
      <p class="text-md text-justify">
        Para começar, você precisa criar uma <strong>organização</strong>. Ela
        será a base para gerenciar seus estabelecimentos e exibir conteúdos
        personalizados.
      </p>

      <UModal :ui="{ content: 'max-w-5xl w-full h-52 p-8' }">
        <UButton
          class="cursor-pointer"
          label="Clique aqui para criar uma organização"
          color="neutral"
          size="lg"
          variant="subtle"
        />

        <template #content>
          <UForm
            :schema="schema"
            :state="state"
            class="space-y-4 p-4"
            @submit="onSubmit"
          >
            <UFormField
              label="Nome da organização"
              name="organization"
              required
            >
              <UInput class="w-full" v-model="state.organization" />
            </UFormField>
            <div class="w-full flex justify-end items-end">
              <UButton class="mt-4" type="submit"> Criar organização </UButton>
            </div>
          </UForm>
        </template>
      </UModal>
    </div>
  </div>
</template>
