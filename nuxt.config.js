import colors from 'vuetify/es5/util/colors';
import extendedAllRoutes from "./router/index";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'allpasal-nuxt',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900'},
      {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css'},
    ]
  },

  router: {

    extendRoutes(routes, resolve) {

      for (let i = 0; i < extendedAllRoutes.length; i++) {

        routes.push({
          name: extendedAllRoutes[i]['name'],
          path: extendedAllRoutes[i]['path'],
          component: resolve(__dirname, extendedAllRoutes[i]['component'])
        })

      }
    },

    middleware: ['shared/maintenanceMode', 'locale/i18n']

  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/app.css',
    '@/assets/scss/app.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vuex-persist', ssr: false},
    {src: '~/plugins/axios'},
    {src: '~/plugins/i18n'},
    {src: '~/plugins/registerErrorComponents', ssr: false},
    {src: '~/plugins/truncate', ssr: false},
    {src: '~/plugins/picZoom', ssr: false},
    {src: '~/plugins/swiper', mode: "client"},
    {src: '~/plugins/vueScrollTo', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-mq',
    '@nuxtjs/axios',
  ],

  'mq': {
    defaultBreakpoint: 'sm',
    breakpoints: {
      mobile: 576,
      tablet: 768,
      ipad: 992,
      laptop: 1200,
      desktop: 1600,
      xlscreen: Infinity
    }

  },

  axios: {
    baseURL: 'https://staging.testpasal.com/api',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          darkBlue: '#003574',
          darkOrange: '#FF5C00',
          logInIconBackground: '#e9e6e6',
          logInTextFieldBorder: '#003574',
        },
        dark: {
          darkBlue: '#FF5C00',
          darkOrange: '#003574',
        }
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vue-i18n'],
  }
}
