<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

const emit = defineEmits(["back-to-login"]);

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().min(1, "required field"),
  lastName: z.string().min(1, "required field"),
  password: z.string().min(8, "Required"),
  passwordRepeat: z.string().min(8, "Required"),
  birth: z.string(),
  roleId: z.number().int().default(1),
});

type Schema = z.output<typeof schema>;

const isSubmitting = ref(false);

const state = ref<Partial<Schema>>({
  email: undefined,
  name: undefined,
  lastName: undefined,
  password: undefined,
  birth: undefined,
  roleId: 1,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;

  const { error } = await useFetch("/api/auth/signup", {
    method: "POST",
    body: {
      ...event.data,
    },
  });

  if (!error.value) {
    toast.add({
      title: "Success",
      description: "Usuário criado com sucesso",
      color: "success",
    });
    state.value.name = undefined;
    state.value.lastName = undefined;
    state.value.email = undefined;
    state.value.birth = undefined;
    state.value.password = undefined;
    state.value.passwordRepeat = undefined;
  }

  if (error.value?.statusCode === 400) {
    toast.add({
      title: "Erro",
      description: "E-mail já cadastrado",
      color: "error",
    });
  }

  if (error.value?.statusCode === 500) {
    toast.add({
      title: "Erro",
      description: "Houve um erro ao cadastrar o usuário",
      color: "error",
    });
  }

  isSubmitting.value = false;
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="max-w-xl w-full border border-green-300 p-8 rounded-lg"
    @submit="onSubmit"
  >
    <div class="flex items-center gap-3.5">
      <UFormField class="mb-4" required label="Nome" name="name">
        <UInput size="lg" class="w-full" v-model="state.name" />
      </UFormField>

      <UFormField class="mb-4" required label="Sobrenome" name="lastName">
        <UInput size="lg" class="w-full" v-model="state.lastName" />
      </UFormField>
    </div>

    <UFormField class="mb-4" required label="E-mail" name="email">
      <UInput size="lg" class="w-full" v-model="state.email" />
    </UFormField>

    <UFormField
      class="mb-4"
      required
      label="Data de Nascimento (mês / dia / ano)"
      name="birth"
    >
      <UInput type="date" size="lg" class="w-full" v-model="state.birth" />
    </UFormField>

    <UFormField class="mb-4" required label="Senha" name="password">
      <UInput
        size="lg"
        class="w-full"
        v-model="state.password"
        type="password"
      />
    </UFormField>

    <UFormField
      required
      class="mb-4"
      label="Repetir senha"
      name="passwordRepeat"
    >
      <UInput
        size="lg"
        class="w-full"
        v-model="state.passwordRepeat"
        type="password"
      />
    </UFormField>

    <div class="flex items-center justify-center mt-8">
      <UButton
        :loading="isSubmitting"
        :disabled="isSubmitting"
        class="cursor-pointer flex items-center justify-center max-w-52 w-full"
        type="submit"
      >
        Cadastrar
      </UButton>
    </div>

    <div class="text-center mt-3.5">
      <span>OU</span>
    </div>

    <div class="flex items-center justify-center mt-3.5">
      <UButton
        variant="ghost"
        @click="emit('back-to-login')"
        color="secondary"
        class="cursor-pointer flex items-center justify-center max-w-52 w-full"
        type="button"
      >
        Voltar para o login
      </UButton>
    </div>
  </UForm>
</template>
