/* eslint-disable no-unused-vars */
import createLogger from 'vuex/dist/logger'
import {
  getToken,
  setToken,
  removeToken,
  setHomeIndexPath,
  removeHomeIndexPath,
  setPmsId,
  removePmsId
} from '@/utils/auth'
import { getFilterRoutes } from '@/utils/permission'

// 登录接口
import { login, logout } from '@/api/login'

// 添加vuex测试插件
export const plugins =
  process.env.NODE_ENV !== 'production' && process.client
    ? [createLogger()]
    : []

export const state = () => ({
  token: getToken() || '',
  permissionRoutes: [],
  userInfo: {}
})

export const getters = {
  token: state => state.token,
  permissionRoutes: state => state.permissionRoutes,
  userInfo: state => state.userInfo
}

export const mutations = {
  LOGIN(state, info) {
    state.token = info.token
    state.userInfo = info
  },
  SET_PERMISSION_ROUTES(state, permissionRoutes) {
    state.permissionRoutes = permissionRoutes
  },
  LOGOUT(state) {
    state.token = ''
    state.industryCode = ''
    state.userInfo = {}
    state.permissionRoutes = []
    state.industryList = []
  }
}

export const actions = {
  // 登录
  async login({ commit }, loginForm) {
    try {
      const userInfo = {
        headImg: null,
        isSupperAdmin: '1',
        name: 'admin',
        pmsId: 'dc78896dd3f147e1973f15ebd0d269f5',
        token: 'ee15eb28-7930-4c33-a4c7-6f47a4abf555',
        userId: '8b4023ff441eac1e45444855165'
      }
      commit('LOGIN', userInfo)
      commit('SET_PERMISSION_ROUTES', getFilterRoutes(userInfo.isSupperAdmin))
      setToken(userInfo.token)
      setHomeIndexPath()
      setPmsId(userInfo.pmsId)
      return { ...userInfo }
    } catch (error) {
      console.log(error)
      throw error
    }
  },
  // 退出
  async logout({ commit, dispatch }) {
    try {
      /* 这里的接口只做日志使用，不管是否调用成功，都跳转至登录页，
      防止出现接口调用失败，无法退出的情况 */
      await this.$axios(logout())
    } catch (error) {
      throw error
    } finally {
      removeToken()
      removeHomeIndexPath()
      removePmsId()
      commit('LOGOUT')
      const loginUri = '/login'
      this.$router.replace(loginUri)
    }
  }
}
