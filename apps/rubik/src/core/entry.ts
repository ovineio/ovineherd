// entry 实际上就是路由配置，必须为数组

import asideLayout from '~/components/renderer/layout'

import { loginRoute } from './constants'

const entry = [
  {
    type: 'preset-route', // 路由组件
    path: loginRoute,
    pathToComponent: true,
  },
  {
    type: 'private-route', // 鉴权路由
    path: '/',
    redirect: loginRoute,
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
        asideLayout,
      ],
    },
  },
]

export default entry
