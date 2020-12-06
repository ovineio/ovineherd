import produce from 'immer'

import { message } from '@core/constants'
import { publish } from '@core/utils/message'

import { sysAdmRoutes } from '~/core/routes'
import { isSysAdminRoute } from '~/core/utils'
import { getAppNav } from '~/core/api/resource'

import layoutState from './schema'

const getModeBtnSchema = (isSysAdmin: boolean) => {
  const modeBtn = isSysAdmin
    ? {
        icon: 'fa fa-eye pull-left',
        label: '预览应用',
      }
    : {
        icon: 'fa fa-pencil pull-left',
        label: '设计应用',
      }

  return {
    ...modeBtn,
    type: 'action',
    onAction: () => {
      publish(message.asideLayoutCtrl.msg, {
        key: message.asideLayoutCtrl.reload,
        data: { designMode: !isSysAdmin },
      })
    },
  }
}

const layoutApis = {
  getLayoutApi: {
    url: 'fakeAsideLayoutApi',
    onFakeRequest: async (option) => {
      const { designMode } = option.data
      const isMounted = typeof designMode !== 'undefined'
      const isSysAdmin = isMounted ? designMode : isSysAdminRoute()

      const nextState = produce(layoutState, async (d) => {
        d.resetRoute = isMounted
        d.header.items[0] = getModeBtnSchema(isSysAdmin)

        // 系统 管理员用户
        if (isSysAdmin) {
          d.routes = sysAdmRoutes
          d.rootRoute = '/admin/sys/page'
          return
        }

        // 普通使用者用户
        const routes = await getAppNav()

        d.rootRoute = '/'
        d.routes = routes
      })
      return nextState
    },
  },
}

export default layoutApis
