const { resolve } = require('path')
module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */

  server: { 
    // host: '192.168.2.155',
    port:3000
  },
  env: {
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:7001/api'
        : 'http://localhost:7001/api',
  },
  rootDir: resolve(__dirname, '../'),
  srcDir: resolve(__dirname, '../web'),
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the vue-config
   */
  vue: {
    config: {
      silent: true,
    },
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#67C23A' },
  /*
   ** Global CSS
   */
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/global-components.js' },
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/init-store', ssr: false },
    { src: '@/plugins/vue-weather.js', ssr: false },
    { src: '@/plugins/service.js',  },
    // { src: '@/plugins/vconsole.js', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],

  /*
   ** Nuxt.js modules
   */
  css: [
    'normalize.css',
    // 'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/overwrite.css',
    '@/assets/css/variables.css',
  ],
  styleResources: {
    less: 'assets/css/*.less',
  },
  modules: [
    '@nuxtjs/style-resources',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/proxy',
  ],

  proxy: {
    '/api': {
      target: 'http://localhost:7001',
    },
    '/uploads': {
      target: 'http://localhost:7001',
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  /*
   ** Build configuration
   */

  buildDir:
    process.env.NODE_ENV !== 'development'
      ? resolve(__dirname, '../public/web')
      : './web/.nuxt',
  build: {
    babel: {
      plugins: [
        [
          'component',
          { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' },
        ],
      ],
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
