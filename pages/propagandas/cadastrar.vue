<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

useHead({
  title: "Cadastrar propaganda",
});

definePageMeta({
  middleware: ["protected"],
  roles: ["admin"],
});

const schema = z.object({
  name: z
    .string({ message: "Campo obrigatório" })
    .min(4, "Must be at least 4 characters"),
  playlistId: z
    .number({ message: "Campo obrigatório" })
    .int({ message: "Campo obrigatório" }),
  url: z
    .array(z.any({ message: "Arquivo inválido" }), {
      required_error: "Campo obrigatório",
    })
    .min(1, "Pelo menos um arquivo é necessário"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  playlistId: undefined,
  url: [],
});

const isSubmitting = ref(false);

const toast = useToast();

const { data } = await useFetch("/api/playlists", {
  method: "GET",
});

async function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (!files) return;

  for (const file of files) {
    const base64 = await convertFileToBase64(file);
    (state.url as string[]).push(base64 as string);
  }
}

function handleRemoveImage(index: number) {
  (state.url as string[]).splice(index, 1);
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  try {
    await $fetch("/api/propagandas", {
      method: "POST",
      body: {
        name: event.data.name,
        url: event.data.url,
        playlistId: event.data.playlistId,
      },
    });
    toast.add({
      title: "Success",
      description: "Monitor criado com sucesso",
      color: "success",
    });

    state.name = undefined;
    state.playlistId = undefined;
    state.url = undefined;
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
      <EditTitleAction title="Propagandas" to="/propagandas" />
    </slot>

    <FormContainer>
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormField label="Nome da propaganda" name="name" required>
          <UInput
            size="lg"
            class="w-full mt-2"
            v-model="state.name"
            type="text"
          />
        </UFormField>

        <UFormField
          class="mt-8"
          label="Nome da playlist"
          name="establishmentId"
          required
        >
          <USelect
            size="lg"
            v-model="state.playlistId"
            :items="data?.playlists"
            label-key="name"
            value-key="id"
            :ui="{
              trailingIcon:
                'group-data-[state=open]:rotate-180 transition-transform duration-200',
            }"
            class="w-full mt-2"
          />
        </UFormField>

        <UFormField class="mt-8" label="URL" name="url" required>
          <UInput
            size="lg"
            class="w-full mt-2"
            @change="handleFileUpload"
            type="file"
            multiple
          />
        </UFormField>

        <div class="flex gap-16 flex-wrap mt-8 mb-12" v-if="state.url?.length">
          <div
            v-for="(img, index) in state.url"
            :key="index"
            class="relative w-44 h-44 group"
          >
            <NuxtImg
              :src="img"
              class="w-full h-full object-cover object-center rounded-md"
              format="webp"
              alt="Propaganda"
            />
            <UButton
              class="cursor-pointer mt-2 w-full flex items-center justify-center"
              @click="handleRemoveImage(index)"
              color="error"
              >Remover imagem</UButton
            >
          </div>
        </div>

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
