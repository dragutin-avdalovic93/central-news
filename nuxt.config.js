const webpack = require("webpack");
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Central news - novinski portal' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Central news - novinski portal' || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',integrity: "sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=",crossorigin: "anonymous" }
      ],
    script: [
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ["~/node_modules/bootstrap/dist/css/bootstrap.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~plugins/bootstrap.js",
    "@/plugins/vue-social-sharing.js",
    { src: '@/plugins/ga.js', mode: 'client' }]
,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    'nuxt-seo'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  moment: {
    /* module options */
    defaultLocale: 'bs',
    locales: ['bs']
  },
  seo: {
    // Module options
    name: 'Central news',
    title: 'Central news - novinski portal',
    templateTitle: '%name% - %title%',
    description: 'Central news je novinski portal koji prati i izvještava o najnovijim dešavanjima u Istočnom Sarajevu, Republici Srpskoj, BiH, regionu i svijetu.',
    image: 'https://www.centralnews.live/central-news-logo.png',
    url: 'https://www.centralnews.live/',
    openGraph: {
      type: 'website',
      url: 'https://www.centralnews.live/',
      name: 'Central news',
      title: 'Central news - novinski portal',
      description: 'Central news je novinski portal koji prati i izvještava o najnovijim dešavanjima u Istočnom Sarajevu, Republici Srpskoj, BiH, regionu i svijetu.',
      image: {
        url: 'https://www.centralnews.live/central-news-logo.png',
        width: '200',
        height: '200'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["jquery", "bootstrap"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        '_': 'lodash'
      })
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  }
}
