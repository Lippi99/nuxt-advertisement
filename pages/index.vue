<script lang="ts" setup>
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

useHead({
  title: "Login screen",
});

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const isSubmitting = ref(false);

const state = ref<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true;
  try {
    setTimeout(() => {
      toast.add({
        title: "Success",
        description: "The form has been submitted.",
        color: "success",
      });
      console.log(event.data);
      isSubmitting.value = false;
    }, 1000);

    await navigateTo("/estabelecimentos");
  } catch (error) {
    toast.add({
      title: "Error",
      description: "There was an error when log in",
      color: "error",
    });
  }
}
</script>

<template>
  <main
    class="w-full max-w-screen min-h-screen flex flex-col items-center justify-center"
  >
    <h1 class="text-4xl mb-16">Welcome to login page!</h1>

    <UForm
      :schema="schema"
      :state="state"
      class="max-w-xl w-full border border-green-300 p-8 rounded-lg"
      @submit="onSubmit"
    >
      <UFormField label="Email" name="email">
        <UInput size="lg" class="w-full" v-model="state.email" />
      </UFormField>

      <UFormField class="mt-6" label="Password" name="password">
        <UInput
          size="lg"
          class="w-full"
          v-model="state.password"
          type="password"
        />
      </UFormField>

      <NuxtLink class="inline-block mt-4" to="/forgot-password"
        >Forgot your password?</NuxtLink
      >

      <div class="flex items-center justify-center mt-8">
        <UButton
          :loading="isSubmitting"
          :disabled="isSubmitting"
          class="cursor-pointer flex items-center justify-center max-w-52 w-full"
          type="submit"
        >
          Submit
        </UButton>
      </div>
    </UForm>
  </main>
</template>
