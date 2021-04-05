/**
 * TODO: 优化加载 LOADING 动画
 * https://github.com/umijs/qiankun/issues/400#issuecomment-676947927
 */

/* eslint-disable no-console */
import { start, registerMicroApps, runAfterFirstMounted, setDefaultMountApp } from 'qiankun'

import { switchPageClassName } from './utils'

import './index.less'

/**
 * Step1 初始化应用（可选）
 */
// render({ loading: true })

// const loader = (loading) => render({ loading })

/**
 * Step2 注册子应用
 */

const presetConfig = {
  localhost: {
    entry: {
      center: '//localhost:7061',
      app: '//localhost:7062',
    },
  },
  staging: {
    entry: {
      center: '/platform/apps_center/',
      app: '/platform/apps_app/',
    },
  },
  production: {
    entry: {
      center: '/platform/apps_center/',
      app: '/platform/apps_app/',
    },
  },
}

const config = presetConfig[process.env.ENV]

// platform/        --- platform/
// platform/apps_center  --- platform/center
// platform/apps_app     --- platform/app
registerMicroApps(
  [
    {
      name: 'center',
      entry: config.entry.center,
      container: '#main-container',
      activeRule: '/platform/center', // baseurl
      // render: loader,
    },
    {
      name: 'app',
      entry: config.entry.app,
      container: '#main-container',
      activeRule: '/platform/app', // baseurl
      // render: loader,
    },
  ],
  {
    beforeLoad: [
      (app) => {
        // console.log('[LifeCycle] before load %c%s', 'color: green;', app.name)
      },
    ],
    beforeMount: [
      (app) => {
        switchPageClassName('add', app.name)
        // console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name)
      },
    ],
    afterUnmount: [
      (app) => {
        switchPageClassName('remove', app.name)
        // console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name)
      },
    ],
  }
)

/**
 * Step3 设置默认进入的子应用
 */
setDefaultMountApp('/platform/center')

/**
 * Step4 启动应用
 */
start({
  sandbox: false,
})

runAfterFirstMounted(() => {
  document.querySelector('.loading-screen').style.display = 'none'
  console.log('[MainApp] first app mounted')
})
