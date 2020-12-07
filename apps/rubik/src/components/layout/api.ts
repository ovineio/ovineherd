import produce from 'immer'

import { getAppRoutes, getSysAdmRoutes } from '~/core/routes'
import { getLink, isSysAdminRoute } from '~/core/utils'
import { getAppRouteItems } from '~/core/api/resource'
import { getAppCustom } from '~/core/common'

import layoutState, { getBrandSchema, getModeBtnSchema } from './schema'

// TODO: 切换 时 会短暂 404 页面，是由于切换 route 时，将原有路由注销了，但是路由并没有同步跳转到新的页面里。
// 方案：切换路由时，不渲染 404 页面，roues 加载完毕再加入 404

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

      // 系统 管理员用户
      if (isSysAdmin) {
        d.rootRoute = getLink('appSystem', 'page')
        d.routes = getSysAdmRoutes()
        return
      }

      // 普通使用者用户
      const routeItems = await getAppRouteItems()
      console.log('@+++>', routeItems)
      d.routes = getAppRoutes(routeItems)
      d.rootRoute = getAppCustom().app_root_route
    })

    return nextState
  },
}

const layoutApis = {
  getLayoutReqOpt,
}

export default layoutApis
