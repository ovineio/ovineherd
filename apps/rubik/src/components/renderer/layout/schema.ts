import userItemSchema from './user_item'

const layoutSchema: any = {
  type: 'aside-layout',
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
      {
        type: 'modeBtn',
      },
      userItemSchema,
    ],
  },
}

export default layoutSchema
