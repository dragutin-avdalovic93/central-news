const webpack = require("webpack");
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Central news - novinski portal' || '',
    htmlAttrs: {
      lang: 'sr_latin'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'name',
        name: 'name',
        content: 'Central news'
      },
      {
        hid: 'title',
        name: 'title',
        content: 'Central news - novinski portal'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Central news je novinski portal koji prati i izvještava o najnovijim dešavanjima u Istočnom Sarajevu, Republici Srpskoj, BiH, regionu i svijetu.'
      },
      {
        hid: 'image',
        name: 'image',
        content: 'https://www.centralnews.live/central-news-logo.png'
      },
      {
        hid: 'url',
        name: 'url',
        content: 'https://www.centralnews.live/'
      },
     {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'Central news'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Central news - novinski portal'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Central news - novinski portal'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'CENTRAL news je novinski portal koji prati najnovija dešavanja iz Sarajevsko-romanijske regije, Republike Srpske, BiH i regiona.'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.centralnews.live/'
      },
      {
        hid: 'og:name',
        property: 'og:name',
        content: 'Central news'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.centralnews.live/central-news-logo.gif'
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: "200"
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: "200"
      },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '243134206938677'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',integrity: "sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=",crossorigin: "anonymous" }
      ],
    script: [
      // { src : 'https://cdn.jsdelivr.net/jquery.validation/1.15.0/jquery.validate.min.js'},
      { src: '/js/fb-sdk.js' }
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
   ** Plugins to load before mounting the Ap
   */
  plugins: ["~plugins/bootstrap.js",
    "@/plugins/vue-social-sharing.js"]
,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/moment',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  googleAnalytics: {
    id: 'G-QCTH5GBLH2',
    dev: false
  },
  moment: {
    /* module options */
    defaultLocale: 'bs',
    locales: ['bs']
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["jquery", "bootstrap"],
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        '_': 'lodash',
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
