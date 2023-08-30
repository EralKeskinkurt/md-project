// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    'nuxt-icon'
  ],
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,// can be overridden by NUXT_API_SECRET environment variable,
    public: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config'
  },
  content: {
  },
  build: {
    chunkSizeWarningLimit: 10000
  },
  router: {
    middleware: ["auth"]
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
  generate: { fallback: true },
  nitro: {
    prerender: {
      routes: ['/404.vue']
    }
  }
})
