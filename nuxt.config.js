export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'catch-reports-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    '@/assets/css/main',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vuelidate.js' },
    { src: '~/plugins/vee-validate.js' },
    // { src: '~/plugins/vue-loading-overlay.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    [
      '@nuxtjs/vuetify',
      {
        theme: {
          themes: {
            light: {
              primary: {
                base: '#10B981',
                lighten1: '#6EE7B7',
              },
              error: '#b71c1c',
              test: '#3B82F6',
            },
          },
        },
        breakpoint: {
          mobileBreakpoint: 'xl', // This is equivalent to a value of 960
        },
      },
    ],
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAeDaj3e948BMUjqpdnELFEt2heja396gY',
          authDomain: 'catch-reports.firebaseapp.com',
          projectId: 'catch-reports',
          storageBucket: 'catch-reports.appspot.com',
          messagingSenderId: '573431449019',
          appId: '1:573431449019:web:776531188b4f1ce8e1709e',
          measurementId: 'G-RPFYW92KEN',
        },
        services: {
          persistence: 'local', // default
          auth: {
            initialize: {
              onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false,
            },
          },
          storage: true,
          firestore: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
  vuetify: {
    customVariables: ['~/assets/css/variables.scss'],
    treeShake: true,
  },
}
