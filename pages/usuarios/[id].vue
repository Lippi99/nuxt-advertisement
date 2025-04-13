<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import dayjs from "dayjs";

useHead({
  title: "Editar usuário",
});

definePageMeta({
  middleware: ["protected"],
  roles: ["admin"],
});

const route = useRoute();

const schema = z
  .object({
    name: z
      .string({ message: "Campo obrigatório" })
      .min(4, "Must be at least 4 characters"),
    lastName: z.string({ message: "Campo obrigatório" }),
    email: z
      .string({ message: "Campo obrigatório" })
      .email({ message: "E-mail inválido" }),
    birth: z.string({ message: "Campo obrigatório" }),
    password: z
      .string()
      .min(8, { message: "Mínimo de 8 caractéres" })
      .optional(),
    passwordRepeat: z
      .string()
      .min(8, { message: "Mínimo de 8 caractéres" })
      .optional(),
    roleId: z.number().int(),
  })
  .superRefine((data, ctx) => {
    if (
      data.password &&
      data.passwordRepeat &&
      data.password !== data.passwordRepeat
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordRepeat"],
        message: "Senhas não coincidem",
      });
    }
  });

type Schema = z.infer<typeof schema>;

const id = route.params.id;

const { data: user } = await useFetch(`/api/usuarios/${id}`);

const state = reactive<Partial<Schema>>({
  name: user.value?.user.name || undefined,
  lastName: user.value?.user.lastName || undefined,
  email: user.value?.user.email || undefined,
  password: undefined,
  passwordRepeat: undefined,
  birth: user.value?.user.birth
    ? dayjs(user.value.user.birth).add(1, "day").format("YYYY-MM-DD")
    : undefined,

  roleId: user.value?.user.roleId || undefined,
});

const isSubmitting = ref(false);

const toast = useToast();

const { data: roles } = await useFetch("/api/roles");

console.log(user.value);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;

  try {
    await $fetch(`/api/usuarios/${id}`, {
      method: "PATCH",
      body: {
        ...event.data,
      },
    });
    toast.add({
      title: "Success",
      description: "Usuário atualizado com sucesso",
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
    <slot name="header">
      <EditTitleAction title="Usuário" to="/usuarios" />
    </slot>

    <FormContainer class="px-0">
      <UForm :schema="schema" :state="state" @submit="onSubmit">
        <div class="flex items-center gap-3.5 mb-4">
          <div class="flex-1">
            <UFormField label="Nome do usuário" name="name" required>
              <UInput
                size="lg"
                class="w-full mt-2"
                v-model="state.name"
                type="text"
              />
            </UFormField>
          </div>

          <div class="flex-1">
            <UFormField label="Último nome" name="lastName" required>
              <UInput
                size="lg"
                class="w-full mt-2"
                v-model="state.lastName"
                type="text"
              />
            </UFormField>
          </div>
        </div>

        <UFormField label="E-mail" name="email" required>
          <UInput
            size="lg"
            class="w-full mt-2"
            v-model="state.email"
            type="email"
          />
        </UFormField>
        <div class="flex items-center gap-3.5 mt-4">
          <div class="flex-1">
            <UFormField label="Senha" name="password" required>
              <UInput
                size="lg"
                class="w-full mt-2"
                v-model="state.password"
                type="password"
              />
            </UFormField>
          </div>
          <div class="flex-1">
            <UFormField label="Repetir senha" name="passwordRepeat" required>
              <UInput
                size="lg"
                class="w-full mt-2"
                v-model="state.passwordRepeat"
                type="password"
              />
            </UFormField>
          </div>
        </div>

        <UFormField class="mt-4" label="Nascimento" name="birth" required>
          <UInput
            size="lg"
            class="w-full mt-2"
            v-model="state.birth"
            type="date"
          />
        </UFormField>

        <UFormField class="mt-4" label="Cargo" name="roleId" required>
          <USelect
            v-model="state.roleId"
            :items="roles?.roles"
            value-key="id"
            label-key="name"
            class="w-full"
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
