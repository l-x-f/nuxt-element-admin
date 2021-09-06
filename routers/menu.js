// 首页
const routes = [
  {
    path: '/menu',
    name: '菜单',
    icon: 'el-icon-menu',
    children: [
      {
        // 系统首页
        path: '/menu/index',
        name: '一级菜单',
        children: [
          {
            path: '/menu/two/index',
            name: '二级菜单',
            children: [
              {
                path: '/menu/two/three/index',
                name: '三级菜单'
              }
            ]
          }
        ]
      },
      {
        path: '/menu/demo',
        name: '一级菜单-demo'
      }
    ]
  }
]
export default routes
