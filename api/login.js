import md5 from 'js-md5'

// 登录
export function login(data) {
  return {
    url: `/login`,
    method: 'post',
    data: { ...data, password: md5(data.password) }
  }
}

// 退出登录
export function logout(data) {
  return {
    url: `/logout`,
    method: 'post',
    data
  }
}
