// 首页 -> 系统首页
export default class HomeServe {
  static getList(data) {
    return {
      url: `/list`,
      method: 'get',
      data
    }
  }
}
