import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

// 语言配置项
export const langes = {
  'zh-CN': { langeName: '简体中文', ...zhLocale },
  'en-US': { langeName: 'English', ...enLocale }
}

// 默认语言
export const DefaultLocale = 'zh-CN'

// nuxt-i18n 配置
const config = langFiles => {
  // 自动加载所有语言文件
  Object.keys(langes).forEach(lang => {
    langFiles.forEach(item => {
      langes[lang] = {
        ...langes[lang],
        [item.name]: require(`./${lang}/${item.name}`).default
      }
    })
  })
  return {
    locales: [...Object.keys(langes)],
    defaultLocale: DefaultLocale,
    vueI18n: {
      fallbackLocale: DefaultLocale,
      messages: { ...langes }
    }
  }
}

export default config
