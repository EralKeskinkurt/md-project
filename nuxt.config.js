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
      public:{
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY, // can be overridden by NUXT_API_SECRET environment variable,
        APP_ID: process.env.APP_ID
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
  ssr: false,
  components: {
    global: true,
    dirs: ['~/components']
  },
  generate: { fallback: true }
})
