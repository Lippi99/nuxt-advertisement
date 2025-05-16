<script lang="ts" setup></script>

<template>
  <div
    class="w-full h-20 bg-neutral-950 border-l-black md:pl-12 flex items-end flex-col justify-end px-12"
  >
    <UTooltip :delay-duration="0" text="Access profile">
      <UButton to="/perfil" variant="link">
        <UIcon
          class="cursor-pointer size-8 text-green-400"
          name="i-lucide-user"
        />
      </UButton>
    </UTooltip>
  </div>
</template>
