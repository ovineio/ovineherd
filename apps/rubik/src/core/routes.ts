import { filterTree, mapTree } from 'amis/lib/utils/helper'

import { RouteItem } from '@core/routes/types'

import { isAppIsolation } from './common'
import { isStrTrue } from './utils'

export const commonRoutes: RouteItem[] = [
  {
    nodePath: 'self',
    label: '个人中心',
    icon: 'fa fa-user-circle-o',
    sideVisible: false,
    exact: true,
  },
  {
    path: '/',
    nodePath: 'welcome',
    pathToComponent: '/system/welcome',
    icon: 'iconfont icon-user-guide',
    label: '欢迎使用',
    highlightParent: false,
    exact: true,
    sideVisible: false,
  },
]

export const sysAdmRoutes = [
  {
    nodePath: 'system',
    limitLabel: '系统管理员',
    label: '',
    children: commonRoutes.concat([
      {
        label: '页面管理',
        nodePath: 'admin/page',
        icon: 'iconfont icon-sdktool',
      },
      {
        label: '权限管理',
        nodePath: 'admin/role',
        icon: 'iconfont icon-shezhi',
      },
      {
        label: '发布应用',
        nodePath: 'admin/publish',
        icon: 'iconfont icon-byapi',
      },
      {
        label: '应用设置',
        nodePath: 'admin/setting/app',
        icon: 'iconfont icon-shezhi',
      },
      {
        label: '登录设置',
        nodePath: 'admin/setting/login',
        icon: 'iconfont icon-app-verify',
      },
    ]),
  },
]

export const userAdmRoutes = [
  {
    nodePath: 'system',
    limitLabel: '普通管理员',
    label: '系统管理',
    icon: 'fa fa-windows',
    children: commonRoutes.concat([
      {
        label: '用户列表',
        nodePath: 'user',
      },
      {
        label: '角色列表',
        nodePath: 'role',
      },
    ]),
  },
]

export const getSysAdmRoutes = () => {
  const isolationAppPaths = ['admin/setting/login']
  const orgAppPaths = ['admin/role']
  return filterTree(sysAdmRoutes, (item) => {
    const isolation = isAppIsolation(true)

    if (isolation) {
      return !orgAppPaths.includes(item.nodePath)
    }

    return !isolationAppPaths.includes(item.nodePath)
  })
}

export const getAppRoutes = (items: any[]) => {
  const routeItems = mapTree(items, (item: any) => {
    const { label, icon, children, page_type, page_id, side_visible } = item
    const withChildren = !!children?.length

    const routeItem: any = {
      nodePath: parseInt(page_id, 10).toString(36),
      label,
      icon,
      sideVisible: isStrTrue(side_visible),
      children: withChildren ? children : undefined,
    }

    // 普通页面
    if (page_type === '1') {
      // 父节点页面
      if (withChildren) {
        routeItem.exact = true
      }
      // 页面接口
      routeItem.pathToComponent = `api://v1/product/${page_id}`
    }
    return routeItem
  })

  // TODO: 支持  设置多类别 侧边栏
  const routes = [
    {
      nodePath: '/',
      label: '',
      limitLabel: '侧边栏目录',
      children: isAppIsolation(true)
        ? routeItems.concat(userAdmRoutes)
        : routeItems.concat(commonRoutes.find((i) => i.path === '/')),
    },
  ]

  return routes
}
