import { message } from '@core/constants'
import { publish } from '@core/utils/message'
import { getAppCustom } from '~/core/common'

import userItemSchema from './user_item'

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
      publish(message.asideLayoutCtrl.msg, {
        key: message.asideLayoutCtrl.reload,
        data: { designMode: !isSysAdmin }, // 刷新时携带新的参数
      })
    },
  }
}

export const getBrandSchema = () => {
  const { title, logo, app_root_route = '/' } = getAppCustom()
  return {
    logo,
    title,
    link: {
      title,
      href: app_root_route,
    },
  }
}

// 默认 Layout 配置
const layoutSchema: any = {
  type: 'aside-layout',
  resetRoute: false,
  routeTabs: {
    enable: true,
    storage: true,
  },
  header: {
    brand: getBrandSchema(),
    // 头部 工具项
    items: [{ type: 'container' }, userItemSchema],
  },
}

export default layoutSchema
