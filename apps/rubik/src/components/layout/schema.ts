import { message } from '@core/constants'
import { publish } from '@core/utils/message'
import { get } from 'lodash'

import { getAppCustom } from '~/core/common'
import { getLink, isSysAdminRoute, linkTo } from '~/core/utils'

import userItemSchema from './user_item'

// isStashLayout:false 时，重置 RouteTabs 并跳到首页
let isStashLayout = true

export function stashLayoutCtrl(type: 'get' | 'set', value?: boolean) {
  if (type === 'set') {
    isStashLayout = value
  }
  return isStashLayout
}

export const getModeBtnSchema = (isSysAdmin: boolean) => {
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
      // 发送 更新 layout 消息，刷新 layoutApi 接口
      isStashLayout = false
      publish(message.asideLayoutCtrl.msg, {
        key: message.asideLayoutCtrl.reload,
        data: { designMode: !isSysAdmin }, // 刷新时携带新的参数
      })
    },
  }
}

export const getBrandSchema = (isSysAdmin?: boolean) => {
  const { title, logo } = getAppCustom()
  return {
    logo,
    title,
    link: isSysAdmin
      ? false
      : {
          title,
          href: '/',
        },
  }
}

// 默认 Layout 配置
const layoutSchema: any = {
  type: 'aside-layout',
  resetRoute: false,
  debounceRoute: 10,
  routeTabs: {
    enable: true,
    storage: true, // 由于多应用切换，场景复杂，暂时先关闭存储功能
    onContextMenu: (menus, roueItem) => {
      if (isSysAdminRoute()) {
        return menus
      }

      const { active, pathToComponent = '', page_id, label } = roueItem || {}
      console.log('contextMenus==>', roueItem)

      if (active && get(pathToComponent, 'url')) {
        menus.unshift({
          label: '设计页面',
          onSelect: () => linkTo(getLink('appSystem', `design/${page_id}?label=${label}`)),
        })
      }
      return menus
    },
  },
  header: {
    brand: getBrandSchema(),
    // 头部 工具项
    items: [{ type: 'container' }, userItemSchema],
  },
}

export default layoutSchema
