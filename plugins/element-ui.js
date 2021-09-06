import Vue from 'vue'
import Element from 'element-ui'

/**
 * @description element-ui 插件的配置，用于快速搭建页面和国际化
 *
 */
export default ({ app }) => {
  Vue.use(Element, {
    size: 'medium',
    i18n: (key, value) => app.i18n.t(key, value)
  })
}
