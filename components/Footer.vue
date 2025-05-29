<template>
  <footer class="bg-zinc-950 border-t border-white/10">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div
        class="flex flex-col items-center justify-between gap-12 lg:flex-row"
      >
        <div class="flex flex-col items-center lg:items-start">
          <img
            class="h-9"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Ad Spotter"
          />
          <p
            class="mt-4 max-w-sm text-center lg:text-start text-sm text-gray-400"
          >
            Tornando a divulgação mais simples, eficiente e acessível para
            pequenos e médios negócios.
          </p>
        </div>

        <div class="flex gap-16">
          <div>
            <h3 class="text-sm font-semibold text-white">Empresa</h3>
            <ul role="list" class="mt-4 space-y-2">
              <li>
                <a href="#" class="hover:text-white text-gray-400">Sobre</a>
              </li>
              <li>
                <a href="#" class="hover:text-white text-gray-400">Blog</a>
              </li>
              <li>
                <a href="#" class="hover:text-white text-gray-400">Carreiras</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-white">Legal</h3>
            <ul role="list" class="mt-4 space-y-2">
              <li>
                <a href="#" class="hover:text-white text-gray-400"
                  >Privacidade</a
                >
              </li>
              <li>
                <a href="#" class="hover:text-white text-gray-400">Termos</a>
              </li>
              <li>
                <a href="#" class="hover:text-white text-gray-400">Cookies</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex gap-6">
          <a href="#" class="text-gray-400 hover:text-white">
            <UIcon name="i-lucide-instagram" class="size-5" />
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <UIcon name="i-lucide-facebook" class="size-5" />
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <UIcon name="i-lucide-github" class="size-5" />
          </a>
          <a href="#" class="text-gray-400 hover:text-white">
            <UIcon name="i-lucide-youtube" class="size-5" />
          </a>
        </div>
      </div>

      <div class="mt-12 border-t border-white/10 pt-8 text-center">
        <p class="text-xs text-gray-500">
          &copy; 2025 Ad Spotter. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
