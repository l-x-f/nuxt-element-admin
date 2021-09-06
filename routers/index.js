import home from './home' //  首页
import menu from './menu' //  菜单

/**
 * @description  路由配置，仅用于面包屑和侧边栏的生成
 *
 * path         页面路径(需要唯一) | 必须参数
 * name         路径名称，和locales 里的menu 配置对应，用于实现国际化 | 必须参数
 * icon         侧边栏图标，支持 element icon和 font-awesome icon | 可选参数
 * svgIcon      侧边栏svg图标文件名称，icon不存在的情况下，才会取svgIcon作为图标，使用在iconFont 上下载svg文件，放在icons目录下即可 | 可选参数
 * children     子菜单，支持多级菜单，没有则生成一级导航菜单 | 可选参数
 * hidden       默认false，true 不在侧边栏显示，但是可以跳转 | 可选参数
 * noBreadcrumb 默认false，true不显示面包屑 | 可选参数
 * redirect     重定向，存在的话，面包屑 跳转的路径按redirect走，不走path | 可选参数
 *
 */

const routers = [...home, ...menu]

export default routers
