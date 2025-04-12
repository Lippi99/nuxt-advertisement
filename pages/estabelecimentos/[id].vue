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
});

type Schema = z.output<typeof schema>;

const { data } = await useFetch(`/api/estabelecimentos/${id.value}`, {
  method: "GET",
});

const title = ref(data.value?.estabelecimento?.name || "");

useHead({
  title: `${title.value} | Nuxt advertisement`,
});

const state = reactive<Partial<Schema>>({
  name: data.value?.estabelecimento?.name || undefined,
});

const isSubmitting = ref(false);

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  try {
    await $fetch(`/api/estabelecimentos/${id.value}`, {
      method: "PATCH",
      body: {
        name: event.data.name,
      },
    });

    title.value = event.data.name;

    toast.add({
      title: "Success",
      description: "Estabelecimento atualizado com sucesso",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro na atualização do estabelecimento",
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
      <EditTitleAction title="Editar estabelecimento" to="/estabelecimentos" />
    </slot>

    <FormContainer>
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <UFormField label="Nome do estabelecimento" name="name" required>
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
            >Editar</UButton
          >
        </div>
      </UForm>
    </FormContainer>
  </NuxtLayout>
</template>
