// entry 实际上就是路由配置，必须为数组

import { AppThemeVariable } from '@core/styled/themes/types'

// 定义用到的主题变量, 可以扩展需要的主题
declare module 'styled-components' {
  export interface DefaultTheme extends AppThemeVariable {}
}

import layout from './layout'

const entry = [
  {
    type: 'private-route', // 鉴权路由
    path: '/',
    redirect: '/login',
    children: layout,
    onAuth: () => true, // 每次页面鉴权 需要调用的认证方法
  },
]

export default entry
