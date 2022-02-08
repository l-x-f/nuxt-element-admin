// 首页
const routes = [
  {
    path: '/home',
    name: '首页',
    icon: 'el-icon-s-home',
    children: [
      {
        // 系统首页
        path: '/home',
        name: '系统首页'
      }
    ]
  }
]
export default routes
