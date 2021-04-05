import { filterTree, mapTree } from 'amis/lib/utils/helper'

import { cloneDeep } from 'lodash'

import { RouteItem } from '@core/routes/types'

import { getHomePageId, isAppIsolation } from './common'
import { isStrTrue } from './utils'

const selfInfoRoute: RouteItem = {
  nodePath: 'self',
  pathToComponent: '/system/self',
  label: '个人中心',
  icon: 'fa fa-user-circle-o',
  sideVisible: false,
  ignoreLimit: true,
  exact: true,
}

const welcomeRoute: RouteItem = {
  path: '/',
  nodePath: 'welcome',
  pathToComponent: '/system/welcome',
  icon: 'iconfont icon-user-guide',
  label: '欢迎使用',
  exact: true,
  highlightParent: false,
  sideVisible: false,
  ignoreLimit: true,
}

export const sysAdmRoutes: RouteItem[] = [
  {
    nodePath: 'system/admin',
    limitLabel: '系统管理员',
    label: '',
    limitOnly: false,
    children: cloneDeep([selfInfoRoute]).concat([
      {
        label: '页面管理',
        nodePath: 'page',
        icon: 'iconfont icon-sdktool',
      },
      {
        label: '权限管理',
        nodePath: 'role',
        pathToComponent: '/system/role',
        icon: 'iconfont icon-app-verify',
      },
      // {
      //   label: '数据模型',
      //   nodePath: 'model',
      //   icon: 'iconfont icon-sdktool',
      // },
      // TODO: 完成发布应用的功能
      // {
      //   label: '发布应用',
      //   nodePath: 'publish',
      //   icon: 'iconfont icon-byapi',
      // },
      {
        label: '应用设置',
        nodePath: 'setting/app',
        icon: 'iconfont icon-shezhi',
      },
      {
        label: '登录设置',
        nodePath: 'setting/login',
        icon: 'iconfont icon-bss-in-protection',
      },
    ]),
  },
]

export const userAdmRoutes: RouteItem[] = [
  {
    nodePath: 'system',
    limitLabel: '普通管理员',
    label: '系统管理',
    icon: 'fa fa-windows',
    children: cloneDeep([selfInfoRoute]).concat([
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
  const isolationAppPaths = ['setting/login']
  const orgAppPaths = ['role']
  return filterTree(sysAdmRoutes, (item) => {
    const isolation = isAppIsolation(true)

    if (isolation) {
      return !orgAppPaths.includes(item.nodePath)
    }

    return !isolationAppPaths.includes(item.nodePath)
  })
}

export const getAppRoutes = (items: any[]) => {
  let withRootRoute = false

  const routeItems = mapTree(items, (item: any) => {
    const { label, icon, children, page_type, limit_str, page_id, side_visible } = item
    const withChildren = !!children?.length

    const routeItem: any = {
      page_type,
      page_id,
      nodePath: parseInt(page_id, 10).toString(36),
      label,
      icon,
      sideVisible: isStrTrue(side_visible),
    }

    if (withChildren) {
      routeItem.children = children
    }

    if (page_id === getHomePageId()) {
      withRootRoute = true
      routeItem.path = '/'
      routeItem.exact = true
    }

    // 普通页面
    if (page_type === '1') {
      // 父节点页面
      if (withChildren) {
        routeItem.exact = true
      }

      // 页面接口
      routeItem.pathToComponent = {
        domain: 'api',
        url: `v1/product/${page_id}`,
      }

      if (limit_str) {
        routeItem.limits = JSON.parse(limit_str)
      }
    }

    if (page_type === '2' && !withChildren) {
      routeItem.pathToComponent = {
        url: 'fakePageApi',
        onFakeRequest: () => {
          return {
            data: {
              schema: {
                type: 'page',
                title: '页面错误',
                body: '当前页面为文件夹页面，请添加子页面！',
              },
            },
          }
        },
      }
    }

    return routeItem
  })

  // TODO: 支持  设置多类别 侧边栏
  const rootRoute: RouteItem[] = withRootRoute
    ? []
    : [{ ...welcomeRoute, sideVisible: !routeItems.length }]
  const routes = [
    {
      nodePath: '/',
      label: '',
      limitLabel: '侧边栏目录',
      children: isAppIsolation(true)
        ? routeItems.concat(rootRoute.concat(userAdmRoutes))
        : routeItems.concat(rootRoute),
    },
  ]

  return routes
}
