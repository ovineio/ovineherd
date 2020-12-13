import produce from 'immer'
import { flatten } from 'lodash'

import { getAppRouteItems } from '~/core/api/resource'
import { getAppCustom } from '~/core/common'
import { getAppRoutes, getSysAdmRoutes } from '~/core/routes'
import { getLink, isSysAdminRoute } from '~/core/utils'

import layoutState, { getBrandSchema, getModeBtnSchema } from './schema'

// TODO: 切换 时 会短暂 404 页面，是由于切换 route 时，将原有路由注销了，但是路由并没有同步跳转到新的页面里。
// 方案：切换路由时，不渲染 404 页面，roues 加载完毕再加入 404

let routeStore = []

const getLayoutReqOpt = {
  url: 'fakeAsideLayoutApi',
  onFakeRequest: async (option) => {
    const { designMode } = option.data
    const isMounted = typeof designMode !== 'undefined'
    const isSysAdmin = isMounted ? designMode : isSysAdminRoute()

    // 修改 布局 schema
    const nextState = produce(layoutState, async (d) => {
      d.resetRoute = isMounted
      d.header.brand = getBrandSchema()
      d.header.items[0] = getModeBtnSchema(isSysAdmin)

      const adminRoutes = getSysAdmRoutes()
      let menuRoutes = routeStore[0]

      // 更新路由信息
      if (!isMounted || !isSysAdmin) {
        const routeItems = await getAppRouteItems()
        menuRoutes = getAppRoutes(routeItems)
      }

      adminRoutes[0].limitOnly = !isSysAdmin
      menuRoutes[0].limitOnly = isSysAdmin

      routeStore = [menuRoutes, adminRoutes]

      d.routes = flatten(routeStore)
      d.rootRoute = isSysAdmin ? getLink('appSystem', 'page') : getAppCustom().app_root_route
    })

    return nextState
  },
}

const layoutApis = {
  getLayoutReqOpt,
}

export default layoutApis
