import Cookies from 'js-cookie'

// 菜单分类id
export const firstClassifyId = 'FIRST_CLASS_ID'

// 设置分类id
export const setClassifyId = id => {
  Cookies.set(firstClassifyId, id)
}

// 获取分类id
export function getClassifyId() {
  return Cookies.getJSON(firstClassifyId) || ''
}

// 删除分类id
export function removeClassifyId() {
  Cookies.remove(firstClassifyId)
}
