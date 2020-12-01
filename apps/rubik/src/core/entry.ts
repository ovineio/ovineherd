// entry 实际上就是路由配置，必须为数组

import { AppThemeVariable } from '@core/styled/themes/types'

// 定义用到的主题变量, 可以扩展需要的主题
declare module 'styled-components' {
  export interface DefaultTheme extends AppThemeVariable {}
}

import layout from './layout'

const entry = [
  {
    type: 'preset-route', // 路由组件
    path: '/login',
    pathToComponent: true,
  },
  {
    type: 'private-route', // 鉴权路由
    path: '/',
    redirect: '/login',
    onAuth: () => true, // 每次页面鉴权 需要调用的认证方法
    children: {
      type: 'switch-route',
      children: [
        {
          type: 'preset-route',
          path: '/admin/sys/design/:pageId',
          pathToComponent: '/admin/sys/design',
          exact: true,
        },
        layout,
      ],
    },
  },
]

export default entry
