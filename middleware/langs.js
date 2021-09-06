import { DefaultLocale } from '@/locales'

/**
 * @description  语言中间件，用于切换路由
 *
 */
export default function ({ store, route, redirect, req }) {
  const routePath = route.path
  const { language } = store.state.app
  if (language !== DefaultLocale && !routePath.includes(`/${language}/`)) {
    return redirect({
      path: `/${language}${routePath}`,
      query: route.query
    })
  }
}
