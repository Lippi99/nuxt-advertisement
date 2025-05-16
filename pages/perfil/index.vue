<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

useHead({
  title: "Perfil",
});

definePageMeta({
  middleware: ["protected"],
  roles: ["admin", "employee"],
});

const { user } = useAuthStore();

const { navigateToStripeDashboard } = useStripe();

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
  email: user?.email,
  name: user?.name,
  lastName: user?.lastName,
  password: undefined,
  birth: user?.birth
    ? new Date(user.birth).toISOString().split("T")[0]
    : undefined,

  roleId: 1,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;

  try {
    await $fetch("/api/auth/update", {
      method: "PATCH",
      body: {
        ...event.data,
      },
    });
    toast.add({
      title: "Success",
      description: "Usuário criado com sucesso",
      color: "success",
    });
  } catch {
    toast.add({
      title: "Erro",
      description: "Houve um erro na criação do usuário",
      color: "error",
    });
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <NuxtLayout name="admin-authenticated">
    <div class="flex items-center justify-center min-h-[calc(100vh-300px)]">
      <UForm
        :schema="schema"
        :state="state"
        class="max-w-xl w-full border border-green-300 p-8 rounded-lg"
        @submit="onSubmit"
      >
        <div class="flex items-center gap-3.5">
          <UFormField class="mb-4" required label="Name" name="name">
            <UInput size="lg" class="w-full" v-model="state.name" />
          </UFormField>

          <UFormField class="mb-4" required label="Last name" name="lastName">
            <UInput size="lg" class="w-full" v-model="state.lastName" />
          </UFormField>
        </div>

        <UFormField class="mb-4" required label="Email" name="email">
          <UInput size="lg" class="w-full" v-model="state.email" />
        </UFormField>

        <UFormField class="mb-4" required label="Birth" name="birth">
          <UInput type="date" size="lg" class="w-full" v-model="state.birth" />
        </UFormField>

        <UFormField class="mb-4" required label="Password" name="password">
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
          label="Password Repeat"
          name="passwordRepeat"
        >
          <UInput
            size="lg"
            class="w-full"
            v-model="state.passwordRepeat"
            type="password"
          />
        </UFormField>

        <div
          v-if="user?.isSubscribed"
          class="flex items-center justify-start mt-8"
        >
          <UButton
            class="cursor-pointer"
            @click="navigateToStripeDashboard"
            color="neutral"
            >Gerenciar assinatura</UButton
          >
        </div>

        <div class="flex items-center justify-center mt-8">
          <UButton
            :loading="isSubmitting"
            :disabled="isSubmitting"
            class="cursor-pointer flex items-center justify-center max-w-52 w-full"
            type="submit"
          >
            Atualizar perfil
          </UButton>
        </div>
      </UForm>
    </div>
  </NuxtLayout>
</template>
