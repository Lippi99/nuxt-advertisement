<script lang="ts" setup>
import Footer from "~/components/Footer.vue";
import PricingSection from "~/components/PricingSection.vue";
import Testimonial from "~/components/Testimonial.vue";

useSeoMeta({
  title: "Gerencie Suas Propagandas |Ad Spotter",
  ogTitle: "Gerencie Suas Propagandas |Ad Spotter",
  description:
    "Acompanhe, edite e gerencie as propagandas dos seus estabelecimentos de forma fácil e rápida com aAd Spotter.",
  ogDescription:
    "Acompanhe, edite e gerencie as propagandas dos seus estabelecimentos de forma fácil e rápida com aAd Spotter.",
  ogType: "website",
  ogUrl: useRequestURL().origin,
});

const features = [
  {
    name: "Gestão de Playlists",
    description:
      "Monte playlists de anúncios, escolha quais mídias exibir e atualize os conteúdos nas telas dos seus estabelecimentos sempre que quiser.",
    href: "#",
    icon: "i-lucide-cloud-upload",
  },
  {
    name: "Acesso Seguro e Centralizado",
    description:
      "Gerencie seus estabelecimentos, playlists e campanhas em um único lugar, com segurança e acesso fácil de qualquer dispositivo.",
    href: "#",
    icon: "i-lucide-lock-keyhole",
  },
  {
    name: "Login rápido via QR Code",
    description:
      "Faça login nos players de forma prática e segura. Use o QR Code para conectar e atualizar suas playlists de anúncios diretamente nas telas dos seus estabelecimentos, sem complicações.",
    href: "#",
    icon: "i-lucide-refresh-ccw",
  },
];

const items = [
  "/usuarios.png",
  "/estabelecimento.png",
  "/monitores.png",
  "/playlists.png",
  "/propagandas.png",
];
</script>

<template>
  <PublicHeader />
  <main>
    <div class="relative isolate overflow-hidden pt-14 h-screen">
      <video
        class="absolute inset-0 -z-10 size-full object-cover brightness-20 blur-sm h-screen"
        autoplay
        muted
        loop
        playsinline
      >
        <source src="/conjunto-videos.mp4" type="video/mp4" />
      </video>

      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="text-center">
            <h1
              class="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl"
            >
              Anúncios inteligentes. Resultados reais
            </h1>
            <p
              class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8"
            >
              Gerencie playlists, acompanhe resultados e faça sua comunicação
              vender mais dentro do seu estabelecimento. Simples, prático e
              eficient
            </p>
          </div>
        </div>
      </div>
      <div
        class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
    </div>

    <!-- CTA -->
    <section id="feature" class="py-24 sm:py-32 border-t border-t-gray-700">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base/7 font-semibold">Seu negócio, mais visível</h2>
          <p
            class="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl lg:text-balance"
          >
            Tudo que você precisa para gerenciar suas propagandas
          </p>
          <p class="mt-6 text-lg/8">
            Crie, organize e acompanhe suas playlists de anúncios em tempo real.
            Tenha controle total sobre a comunicação dos seus estabelecimentos,
            de forma simples, rápida e eficiente.
          </p>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl
            class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
          >
            <div
              v-for="feature in features"
              :key="feature.name"
              class="flex flex-col border border-green-400 rounded-lg p-4 bg-zinc-850"
            >
              <CardFeature :feature />
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Feature section -->
    <section
      id="product"
      class="border-t border-t-gray-700 overflow-hidden py-24 sm:py-32"
    >
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <p
          class="max-w-2xl text-5xl font-semibold tracking-tight text-pretty text-white sm:text-6xl sm:text-balance"
        >
          Tudo que você precisa saber no app
        </p>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          Nosso app foi desenvolvido para que pequenos negócios tenham total
          controle sobre sua comunicação. Crie playlists de anúncios, escolha o
          que será exibido nas telas do seu estabelecimento e acompanhe tudo de
          forma simples, rápida e prática. Uma solução pensada para quem quer
          divulgar seus produtos e serviços sem complicação.
        </p>

        <div class="relative w-full mt-16 h-[680px]">
          <div
            class="absolute inset-0 rounded-[calc(var(--radius-xl)+calc(var(--spacing)*2))] bg-white/5 shadow-[inset_0_0_2px_1px_rgb(255_255_255/2.5%)] ring-1 ring-white/80"
          />

          <UCarousel
            v-slot="{ item }"
            arrows
            dots
            loop
            prev-icon="i-lucide-chevron-left"
            next-icon="i-lucide-chevron-right"
            :items="items"
            class="w-full h-full"
          >
            <img
              :src="item"
              class="rounded-lg w-full h-[680px] object-contain"
              alt="Imagem do app"
            />
          </UCarousel>
        </div>
      </div>
    </section>

    <section id="pricing">
      <PricingSection />
    </section>

    <section id="about">
      <Testimonial />
    </section>

    <Footer />
  </main>
</template>
