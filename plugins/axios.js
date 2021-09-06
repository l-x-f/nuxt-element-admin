import { getErrorMessage } from '@/utils/errorStatus'
import { Message } from 'element-ui'

export default function ({ $axios, redirect, store, route, req }) {
  // 请求拦截器
  $axios.onRequest(config => {
    const { token } = store.state
    if (token) {
      config.headers.Authorization = token
    }
    const { language } = store.state.app
    config.headers['Content-Type'] = 'application/json'
    config.headers.Language = language
    // config.headers.platform = 'web'
    config.baseURL = process.env.NUXT_APP_BASE_URL
    config.timeout = 120 * 1000

    return config
  })

  // 响应拦截器
  $axios.onResponse(response => {
    const res = response.data
    if (res.success) {
      return res
    }
    // 针对导出excel拿到blob数据时做特殊处理
    if (response.config.responseType === 'blob') {
      return response
    }
    return Promise.reject(response)
  })

  // 错误拦截器
  $axios.onError(error => {
    const { status, data } = error
    // 清除所有提示
    Message.closeAll()
    if (status === 200) {
      const code = data?.code
      const message = data?.message
      if (code && (code === 'NOT_LOGIN' || code === 'TOKEN_EMPTY')) {
        // token过期了
        Message({
          message: '非法登录',
          type: 'error',
          duration: 3 * 1000,
          onClose: () => {
            store.dispatch('logout')
          }
        })
        return
      }
      Message.error(message || '请求失败')
      return
    }
    const errMsg = getErrorMessage(status)
    Message.error(errMsg || '请求失败')
  })
}
