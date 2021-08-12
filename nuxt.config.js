export default {
  ssr: false,
  // target: 'static',
  srcDir: 'src/',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - nuxt',
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap' }

    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/theme.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // plugins
    { src: '~/plugins/google-map' }

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    ['@nuxtjs/vuetify', {
      customVariables: ['~/assets/scss/vuetify/variables/_index.scss'],
      optionsPath: '~/configs/vuetify.js',
      treeShake: true,
      defaultAssets: {
        font: false
      }
    }],
    '@nuxtjs/ngrok'
  ],
  ngrok: {
    // module options
    authtoken: '1s3zfkT9hLWW6dJ51VDGSTr06ks_pn1PLRbQMvocA6SJ4Jpe'
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [

  ],
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^vue2-google-maps($|\/)/]
  }
}
