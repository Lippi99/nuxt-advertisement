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
        description: "The form has been submitted.",
        color: "success",
      });
    } else {
      throw result.error;
    }
  } catch (error: any) {
    console.log(error);

    const errorMessage =
      error?.response?._data?.message || "There was an error when logging in";

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
    <div class="text-center mt-3.5">
      <span>OR</span>
    </div>

    <div class="flex items-center justify-center mt-3.5">
      <UButton
        variant="ghost"
        @click="emit('isRegister', true)"
        color="secondary"
        class="cursor-pointer flex items-center justify-center max-w-52 w-full"
        type="button"
      >
        Register
      </UButton>
    </div>
  </UForm>
</template>
