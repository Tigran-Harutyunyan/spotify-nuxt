// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', 'nuxt-headlessui', '@vee-validate/nuxt', '@nuxtjs/supabase', '@pinia/nuxt', "@nuxt/image", '@vueuse/nuxt', '@nuxtjs/google-fonts'],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  googleFonts: {
    subsets: 'latin',
    families: {
      Figtree: {
        wght: [300, 400, 500, 600, 700, 800, 900],
      },
      Open_Sans: {
        wght: [400, 500, 600],
      }
    }
  },
  supabase: {
    // Options
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/',
      callback: '/',
      include: undefined,
      exclude: [],
      cookieRedirect: false,
    }
  },
  image: {
    domains: []
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL,
    }
  },
})
