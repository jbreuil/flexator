// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@unocss/nuxt',
    '@vueuse/nuxt',
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
})
