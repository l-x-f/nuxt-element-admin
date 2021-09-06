/* eslint-disable nuxt/no-cjs-in-config */
import webpack from 'webpack'
import i18nConfig from './locales/index'
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
// 生产环境判断
const isEnvProduction = process.env.NODE_ENV === 'production'

// 加载.env.* 环境变量
const env = require('./utils/parseEnv')

console.log(env)

// 自动加载语言文件
const autoLoadFile = require('./utils/autoLoadFile')
// 加载语言文件目录，取 `./locales/zh-CN` 或者 `./locales/en-US` 或者其他语言文件目录都可以
const langFiles = autoLoadFile('./locales/zh-CN')

const base = '/'

const title = JSON.parse(env.NUXT_APP_WEB_TITLE)

export default {
  // 修改loading
  loading: {
    color: '#409EFF'
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title,
    meta: [
      { charset: 'utf-8' },
      {
        hid: 'description',
        name: 'description',
        content: title
      },
      {
        hid: 'description',
        name: 'description',
        content: title
      }
    ],

    link: [{ rel: 'icon', type: 'image/x-icon', href: base + 'favicon.ico' }]
  },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'normalize.css/normalize.css',
    'font-awesome/css/font-awesome.min.css',
    '@/styles/index.scss'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/storage', ssr: false },
    { src: '@/plugins/globalComponents', ssr: false },
    { src: '@/plugins/svgIcon', ssr: false },
    { src: '@/plugins/chart', ssr: false },
    { src: '@/plugins/download', ssr: false }
  ], //
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    [
      'nuxt-i18n',
      {
        ...i18nConfig(langFiles)
      }
    ],
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    parallel: true,
    transpile: [/^element-ui/],
    extend(config, { isDev }) {
      if (isDev) {
        config.devtool = 'cheap-module-eval-source-map'
      }

      config.module.rules.find(item =>
        item.test.test('.svg')
      ).exclude = resolve('./icons')

      // svg-icon support
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('./icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      })
    },
    plugins: [new webpack.DefinePlugin({ 'process.env': env })],
    terser: {
      terserOptions: {
        compress: {
          drop_console: isEnvProduction
        }
      }
    }
  },
  router: {
    base,
    middleware: ['auth', 'langs']
  },
  server: {
    port: 8368,
    host: 'localhost'
  }
}
