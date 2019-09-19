import { resolve } from 'path'

export default {
  mode: 'universal',
  rootDir: process.env.NODE_ENV === 'integrate' ? '../' : './',
  srcDir: process.env.NODE_ENV === 'integrate' ? 'web/' : './',
  /*
   ** Headers of the page
   */
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
   ** Customize the router
   */

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff', height: '10px' },
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
    '^/api/': { target: 'http://localhost:8000' },
    '/uploads/': { target: 'http://localhost:8000' },
  },

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  /*
   ** Build configuration
   */
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