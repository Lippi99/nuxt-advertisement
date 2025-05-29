<script setup lang="ts">
import { ref } from "vue";

const frequency = ref("monthly");

const frequencies = [
  { label: "Mensal", id: "monthly" },
  { label: "Anual", id: "annually" },
];

const tiers = [
  {
    name: "Básico",
    id: "tier-startup",
    href: "/login",
    price: { monthly: "R$ 8", annually: "R$ 85" },
    description: "Plano básico para impulsionar seu negócio.",
    features: ["1 organização", "10 playlists", "1GB de armazenamento"],
    mostPopular: true,
  },
];
</script>

<template>
  <div class="py-24 sm:py-32 border-t border-t-gray-700">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="text-base/7 font-semibold text-indigo-400">Planos</h2>
        <p
          class="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl"
        >
          Seu crescimento, nossa prioridade
        </p>
      </div>
      <p
        class="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-400 sm:text-xl/8"
      >
        Escolha um plano acessível, com os recursos ideais para gerenciar suas
        playlists, seus anúncios e seus estabelecimentos.
      </p>

      <div class="mt-10 flex justify-center gap-2">
        <button
          v-for="option in frequencies"
          :key="option.id"
          @click="frequency = option.id"
          :class="[
            frequency === option.id
              ? 'bg-green-400  text-white'
              : 'bg-white/10 text-white hover:bg-white/20',
            'rounded-full px-5 py-2 text-sm font-semibold transition cursor-pointer',
          ]"
        >
          {{ option.label }}
        </button>
      </div>

      <!-- 💳 Card do Plano -->
      <div class="isolate mx-auto mt-10 flex items-center justify-center">
        <div
          v-for="tier in tiers"
          :key="tier.id"
          :class="[
            tier.mostPopular
              ? 'bg-white/5 ring-2 ring-green-400'
              : 'ring-1 ring-white/10',
            'rounded-3xl p-8 xl:p-10',
          ]"
        >
          <div class="flex items-center justify-between gap-x-4">
            <h3 :id="tier.id" class="text-lg/8 font-semibold text-white">
              {{ tier.name }}
            </h3>
            <p
              v-if="tier.mostPopular"
              class="rounded-full bg-green-400 px-2.5 py-1 text-xs/5 font-semibold text-white"
            >
              Mais popular
            </p>
          </div>
          <p class="mt-4 text-sm/6 text-gray-300">{{ tier.description }}</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-semibold tracking-tight text-white">
              {{ tier.price[frequency as "monthly" | "annually"] }}
            </span>
            <span class="text-sm/6 font-semibold text-gray-300">
              {{
                frequencies.find((f) => f.id === frequency)?.label.toLowerCase()
              }}
            </span>
          </p>
          <NuxtLink
            :to="{ path: tier.href, query: { register: 'true' } }"
            :aria-describedby="tier.id"
            :class="[
              tier.mostPopular
                ? 'bg-green-500  text-white shadow-xs hover:bg-green-400 focus-visible:outline-green-400'
                : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
              'mt-6 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2',
            ]"
          >
            Adquirir plano
          </NuxtLink>
          <ul
            role="list"
            class="mt-8 space-y-3 text-sm/6 text-gray-300 xl:mt-10"
          >
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex gap-x-3"
            >
              <span class="text-white">✔</span>
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
