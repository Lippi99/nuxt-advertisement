<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

useHead({
  title: "Editar monitor",
});

definePageMeta({
  middleware: ["protected"],
});

const route = useRoute();

const schema = z
  .object({
    name: z
      .string({ message: "Campo obrigatório" })
      .min(4, "Must be at least 4 characters"),

    url: z
      .array(z.any({ message: "Arquivo inválido" }), {
        required_error: "Campo obrigatório",
      })
      .optional(),
  })
  .refine(
    (data) => {
      // If no existing images and no new uploads, it's invalid
      const hasExistingImages =
        advertisement.value?.advertisement.images &&
        advertisement.value?.advertisement.images?.length > 0;
      const hasNewUploads = data.url && data.url.length > 0;

      return hasExistingImages || hasNewUploads;
    },
    {
      path: ["url"],
      message: "Pelo menos um arquivo é necessário",
    }
  );
type Schema = z.output<typeof schema>;

const id = route.params.id;

const { data: advertisement, refresh } = await useFetch(
  `/api/propagandas/${id}`
);

const state = reactive<Partial<Schema>>({
  name: advertisement.value?.advertisement.name || undefined,
  url: [],
});

const isSubmitting = ref(false);
const isDeletingImageVideo = ref(false);

const toast = useToast();

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
    await $fetch(`/api/propagandas/${id}`, {
      method: "PATCH",
      body: {
        name: event.data.name,
        url: event.data.url,
      },
    });
    toast.add({
      title: "Success",
      description: "Propaganda atualizada com sucesso",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro ao atualizar a propaganda",
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
}

async function handleDeleteImageVideo(id: number) {
  isDeletingImageVideo.value = true;
  try {
    await useFetch(`/api/propaganda-imagem/${id}`, {
      method: "DELETE",
    });
    await refresh();
    toast.add({
      title: "Success",
      description: "Imagem excluída com sucesso",
      color: "success",
    });
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Houve um erro ao excluir a imagem",
      color: "success",
    });
  } finally {
    isDeletingImageVideo.value = false;
  }
}

const hasImages = computed(
  () =>
    advertisement.value?.advertisement.images &&
    advertisement.value?.advertisement.images.length > 0
);
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

        <UFormField class="mt-8" label="URL" name="url" :required="!hasImages">
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

        <div class="my-8">
          <UModal
            :title="`Imagens / vídeos da propaganda ${advertisement?.advertisement.name}`"
          >
            <UButton
              class="cursor-pointer"
              size="lg"
              :label="`Consultar imagens (${advertisement?.advertisement.images.length})`"
              color="info"
            />

            <template #body>
              <div>
                <h2 class="mb-4">Imagens:</h2>
                <div class="flex flex-wrap gap-12">
                  <div
                    v-for="image in advertisement?.advertisement.images"
                    :key="image.id"
                    class="flex flex-col"
                  >
                    <NuxtImg
                      class="w-44 h-44 object-cover object-center rounded-md"
                      format="webp"
                      :src="image.url"
                      :alt="`Propaganda - ${image.id}`"
                      placeholder
                    />
                    <UButton
                      @click="handleDeleteImageVideo(image.id)"
                      :loading="isDeletingImageVideo"
                      color="error"
                      class="cursor-pointer mt-3.5"
                      >Remover propaganda</UButton
                    >
                  </div>
                </div>
              </div>
            </template>
          </UModal>
        </div>

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
