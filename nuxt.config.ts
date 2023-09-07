export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  css: ['~/assets/css/reset.css', '~/assets/css/common.css'],
  plugins: ['~/plugins/globalVariables.ts'],
  modules: ['nuxt-swiper']
})
