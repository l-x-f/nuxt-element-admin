/* eslint-disable no-inner-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */

import { TokenKey, IndustryCodeKey, HomeIndexPathKey } from '@/utils/auth'
import { getCookie } from '@/utils'

const loginPath = '/login'
// 选择行业路径

const indexPath = process.env.NUXT_APP_INDEX_PATH
// 路由白名单，直接绕过路由守卫
const whiteList = [loginPath]

/**
 * @description  鉴权中间件，用于校验登陆
 *
 */
export default async ({ redirect, route, req }) => {
  const { path, fullPath, query } = route
  const { redirect: redirectPath } = query
  // 应对刷新 vuex状态丢失的解决方案
  if (process.server) {
    const cookie = req.headers.cookie
    const token = getCookie(cookie, TokenKey)
    const industryCode = getCookie(cookie, IndustryCodeKey)
    const homeIndexPath = getCookie(cookie, HomeIndexPathKey)
    const homePath = homeIndexPath || indexPath

    if (token) {
      const isAllLoginPath = path === loginPath
      if (path === '/') {
        return redirect(loginPath)
      } else if (isAllLoginPath && industryCode) {
        // 已经登录过的，进来是是登录页 并且已经选择过industryCode
        return redirect(homePath)
      } else {
        // 其他的正常跳转
        return
      }
    } else {
      // 鉴权白名单
      if (whiteList.includes(path)) return

      // 未登录，进来的不是是登录页，全部重定向到登录页
      if (!path.includes(loginPath)) {
        redirect(`${loginPath}?redirect=${encodeURIComponent(fullPath)}`)
      }
    }
  }
}
