import Cookies from 'js-cookie'

// 侧边栏是否开启key
const SidebarIsOpenKey = 'Sidebar-Status'

// 设置语言key
export const LanguageKey = 'current-language'

export const state = () => ({
  sidebar: !!Number(Cookies.get(SidebarIsOpenKey)),
  language: Cookies.get(LanguageKey) || 'zh-CN',
  breads: []
})

export const getters = {
  sidebar: state => state.sidebar,
  language: state => state.language,
  breads: state => state.breads
}

export const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar) {
      Cookies.set(SidebarIsOpenKey, 0)
      state.sidebar = false
    } else {
      Cookies.set(SidebarIsOpenKey, 1)
      state.sidebar = true
    }
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set(LanguageKey, language)
    Cookies.set('i18n_redirected', language)
  },
  SET_BREADS(state, breads) {
    state.breads = breads
  }
}

export const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setBreadcrumb({ commit }, breads) {
    commit('SET_BREADS', breads)
  }
}
