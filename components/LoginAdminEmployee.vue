<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const router = useRouter();

const authStore = useAuthStore();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Required"),
});

type Schema = z.output<typeof schema>;

const isSubmitting = ref(false);

const state = ref<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const emit = defineEmits(["isRegister"]);

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  try {
    const result = await authStore.login(event.data.email, event.data.password);

    if (!result.error) {
      console.log(result);
      await navigateTo("/estabelecimentos");

      toast.add({
        title: "Success",
        description: "Usuário autenticado com sucesso",
        color: "success",
      });
    } else {
      throw result.error;
    }
  } catch (error: any) {
    console.log(error);

    const errorMessage =
      error?.response?._data?.message || "Houve um erro ao logar";

    toast.add({
      title: "Error",
      description: errorMessage,
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="max-w-xl w-full border border-green-300 p-8 rounded-lg"
    @submit="onSubmit"
  >
    <UFormField label="E-mail" name="email">
      <UInput size="lg" class="w-full" v-model="state.email" />
    </UFormField>

    <UFormField class="mt-6" label="Senha" name="password">
      <UInput
        size="lg"
        class="w-full"
        v-model="state.password"
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
        Entrar
      </UButton>
    </div>
    <div class="text-center mt-3.5">
      <span>OU</span>
    </div>

    <div class="flex items-center justify-center mt-3.5">
      <UButton
        variant="ghost"
        @click="emit('isRegister', true)"
        color="secondary"
        class="cursor-pointer flex items-center justify-center max-w-52 w-full"
        type="button"
      >
        Cadastrar-se
      </UButton>
    </div>
  </UForm>
</template>
