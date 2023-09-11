export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  css: ['~/assets/css/reset.css', '~/assets/css/common.css'],
  plugins: ['~/plugins/globalVariables.ts'],
  modules: ['nuxt-swiper'],
  ssr:false,
  runtimeConfig: {
    public: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_API_KEY: process.env.VITE_SUPABASE_API_KEY
    },
  }
})
