import Cookies from 'js-cookie'
// token key
export const TokenKey = 'Admin-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 行业industryCode
export const IndustryCodeKey = 'Industry-Code'

export function getIndustryCode() {
  return Cookies.get(IndustryCodeKey)
}

export function setIndustryCode(list) {
  Cookies.set(IndustryCodeKey, list)
}

export function removeIndustryCode() {
  return Cookies.remove(IndustryCodeKey)
}

// 首页HomeIndexPath
export const HomeIndexPathKey = 'Home-Index-Path'

export function getHomeIndexPath() {
  return Cookies.get(HomeIndexPathKey)
}

export function setHomeIndexPath(HomeIndexPath) {
  return Cookies.set(HomeIndexPathKey, HomeIndexPath)
}

export function removeHomeIndexPath() {
  return Cookies.remove(HomeIndexPathKey)
}

// 权限id pmsId
export const PmsIdKey = 'Pms-Id-Key'

export function getPmsId() {
  return Cookies.get(PmsIdKey)
}

export function setPmsId(PmsId) {
  return Cookies.set(PmsIdKey, PmsId)
}

export function removePmsId() {
  return Cookies.remove(PmsIdKey)
}
