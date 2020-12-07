/**
 * TODO: 优化加载 LOADING 动画
 */

/* eslint-disable no-console */
import {
  start,
  registerMicroApps,
  runAfterFirstMounted,
  setDefaultMountApp,
  initGlobalState,
} from 'qiankun'

import './index.less'

/**
 * Step1 初始化应用（可选）
 */
// render({ loading: true })

// const loader = (loading) => render({ loading })

/**
 * Step2 注册子应用
 */

registerMicroApps(
  [
    {
      name: 'platform',
      entry: '//localhost:7061',
      container: '#main-container',
      activeRule: '/platform',
    },
    {
      name: 'app',
      entry: '//localhost:7062',
      container: '#main-container',
      activeRule: ['/org/:orgId/app', '/app'],
    },
  ],
  {
    beforeLoad: [
      (app) => {
        console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
      },
    ],
    beforeMount: [
      (app) => {
        console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      },
    ],
    afterUnmount: [
      (app) => {
        console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      },
    ],
  }
)

const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun',
})

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev))

setGlobalState({
  ignore: 'master',
  user: {
    name: 'master',
  },
})

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/platform')

/**
 * Step4 启动应用
 */
start()

runAfterFirstMounted(() => {
  document.querySelector('.loading-screen').style.display = 'none'
  console.log('[MainApp] first app mounted')
})
