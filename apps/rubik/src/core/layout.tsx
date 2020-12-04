import produce from 'immer'

import { message } from '@core/constants'
import { publish } from '@ovine/core/lib/utils/message'
import { css, DefaultTheme } from 'styled-components'

import { sysAdmRoutes, userAdmRoutes } from './routes'
import { isSysAdminRoute } from './utils'
import { getAppNav } from './api/resource'

const layoutState: any = {
  routes: sysAdmRoutes,
  resetRoute: false,
  routeTabs: {
    enable: true,
    storage: true,
  },
  header: {
    brand: {
      // 公司品牌
      logo: '/demo/static/images/logo_line_white.png',
      title: 'Ovine',
      link: {
        title: 'dashboard',
        href: '/',
      },
    },
    // 头部 工具项
    items: [
      // {},
      // {
      //   type: 'item-search-menu', // 搜索侧边栏
      // },
      {
        type: 'lib-css',
        align: 'right',
        body: {
          type: 'service',
          name: 'headItemUserInfo',
          // api: apis.getSelfInfo,
          body: {
            type: 'lib-dropdown',
            className: 'clickable',
            body: {
              type: 'html',
              className: 'item-user-content',
              html: `
              <img
                className="w-2x m-r-xs"
                src="$avatar"
                alt="avatar"
              />
              <span>$nickname</span>
            `,
            },
            items: [
              {
                type: 'button',
                level: 'link',
                icon: 'fa fa-edit',
                label: '个人中心',
                actionType: 'link',
                link: '/admin/self',
              },
              {
                type: 'button',
                level: 'link',
                icon: 'fa fa-edit',
                label: '返回组织',
                actionType: 'link',
                link: '/admin/setting/self',
              },
              {
                type: 'button',
                level: 'link',
                icon: 'fa fa-reply',
                label: '退出登录',
                // onClick: () => logout({ useApi: true }),
              },
            ],
          },
        },
        css: (theme: DefaultTheme) => css`
          .${theme.ns}Spinner {
            width: 25px !important;
            height: 25px !important;
          }
          .item-user-content {
            display: inline-block;
            min-width: 80px;
            img {
              width: 28px;
              height: 28px;
            }
            span {
              vertical-align: middle;
            }
          }
        `,
      },
    ],
  },
}

const getModeBtn = (designMode: boolean) => {
  const modeInfo = !designMode
    ? {
        icon: 'fa fa-pencil pull-left',
        label: '设计应用',
      }
    : {
        icon: 'fa fa-eye pull-left',
        label: '预览应用',
      }

  return {
    ...modeInfo,
    type: 'action',
    onAction: () => {
      publish(message.asideLayoutCtrl.msg, {
        key: message.asideLayoutCtrl.reload,
        data: { designMode: !designMode },
      })
    },
  }
}

const layout = {
  type: 'aside-layout', // 侧边栏布局
  api: {
    url: 'fakeLayoutApi',
    onFakeRequest: async (option) => {
      const { designMode } = option.data
      const isMounted = typeof designMode !== 'undefined'
      const mode = !isMounted ? isSysAdminRoute() : designMode
      const nextState = produce(layoutState, async (d) => {
        d.resetRoute = !isMounted ? false : true
        d.header.items[0] = getModeBtn(mode)
        if (mode) {
          d.routes = sysAdmRoutes
          d.rootRoute = '/admin/sys/page'
        } else {
          const routes = await getAppNav()
          // 动态获取
          d.rootRoute = '/'
          d.routes = routes
        }
      })
      return nextState
    },
  },
}

export default layout
