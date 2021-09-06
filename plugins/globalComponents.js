import Vue from 'vue'
const requireComponent = require.context('../components/Global', true, /\.vue$/)

requireComponent.keys().forEach(filePath => {
  const componentName = filePath.substring(2).split('.')[0]
  Vue.component(componentName, requireComponent(filePath).default)
})
