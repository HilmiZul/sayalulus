import pkg from './package.json'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-04-29',
  devtools: { enabled: false },
  css: [
    "bootswatch/dist/sketchy/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],
  modules: [
    "@nuxtjs/supabase",
    "@nuxtjs/mdc",
    "nuxt-countdown",
  ],
  supabase: { redirect: false },
  app: {
    head: {
      script: [{
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2/dist/js/bootstrap.bundle.min.js"
      }]
    }
  },
  runtimeConfig: {
    public: {
      appVersion: pkg.version,
      author: pkg.author,
    }
  }
})
