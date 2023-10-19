export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  css: ['~/assets/css/reset.css', '~/assets/css/common.css', '~/assets/css/shop.css', '~/assets/css/article.css'],
  plugins: ['~/plugins/globalVariables.ts', '~/plugins/fontawesome.ts'],
  modules: ['nuxt-swiper', 'nuxt-clarity-analytics'],
  ssr: false,
  app: {
    head: {
      "script": [
        {
          innerHTML: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "iu1fzbkjnf");`,
          type: 'text/javascript',
        },
        { src: 'https://platform.twitter.com/widgets.js', async: true, charset: 'utf-8' }

      ],
    },
  },
  runtimeConfig: {
    public: {
      VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
      VITE_SUPABASE_API_KEY: process.env.VITE_SUPABASE_API_KEY,
      VITE_MICROSOFT_CLARITY_ID: process.env.VITE_MICROSOFT_CLARITY_ID
    }
  }
})
