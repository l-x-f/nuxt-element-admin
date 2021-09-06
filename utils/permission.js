/* eslint-disable no-caller */
import routers from '@/routers'
import { findPath } from '@/utils'
import { Message } from 'element-ui'

const indexPath = process.env.NUXT_APP_INDEX_PATH

/**
 * @desc  过滤多余菜单数据
 * @param {array} menuList
 * @return  res 过滤后菜单数据
 */
export function getFilterMenuData(menuList) {
  const list = menuList && menuList.length ? menuList : []
  // 生成子菜单
  function getChildren(item) {
    return item.menuChildren
      ? item.menuChildren.map(val => ({
          ...findPath(routers, val.menuUrl),
          svgIcon: '',
          icon: '',
          children: val.menuChildren ? arguments.callee(val) : null
        }))
      : null
  }
  const res = list.map(val => ({
    ...findPath(routers, val.menuUrl),
    children: getChildren(val)
  }))
  return res
}

/**
 * @desc 获取菜单首页路径
 * @param {array} menuList
 * @return path
 */
export function getIndexPath(menuList) {
  const list = menuList && menuList.length ? menuList : []
  // 导航首页路径
  const parentPath = list[0] ? list[0].menuUrl : ''
  let childrenPath
  if (
    parentPath &&
    list[0] &&
    list[0].menuChildren &&
    list[0].menuChildren.length
  ) {
    childrenPath = list[0].menuChildren[0].menuUrl
  }
  return childrenPath || parentPath || indexPath
}

/**
 * @desc 获取过滤后的路由
 * @param {array} routers
 * @return res 过滤后的路由
 */
export function getFilterRoutes(isSupperAdmin, menuList) {
  if (isSupperAdmin === '1') {
    return routers
  }
  const list = menuList && menuList.length ? menuList : []
  const filterMenuData = getFilterMenuData(list)
  return filterMenuData
}

/**
 * @desc 判断首页的按钮权限
 * @param {object}
 * @return
 */
export function getHomePagePermission({
  isSupperAdmin,
  path,
  permissionRoutes
}) {
  if (isSupperAdmin === '1') {
    return true
  }
  const item = findPath(permissionRoutes, path)
  console.log(item)
  if (item) {
    return true
  }
  Message.error('没有后台菜单权限，请联系管理员！')
  return false
}
