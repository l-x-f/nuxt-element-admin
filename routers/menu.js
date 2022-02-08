// 首页
const routes = [
  {
    path: '/menu',
    name: '菜单',
    icon: 'el-icon-menu',
    children: [
      {
        // 系统首页
        path: '/menu',
        name: '一级菜单',
        children: [
          {
            path: '/menu/two',
            name: '二级菜单',
            children: [
              {
                path: '/menu/two/three',
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
