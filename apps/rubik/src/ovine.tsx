import { cloneDeep, set } from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom'

import { app } from '@core/app'
import { AppConfig } from '@core/app/types'
import { App } from '@core/components/app'
import { AppThemeVariable } from '@core/styled/themes/types'
import { initLogger } from '@core/utils/logger'

import { DeepPartial } from '@core/utils/types'

import { schemaDefinitions } from '~/core/amis'
import { appRootSelector, loginRoute } from '~/core/constants'
import entry from '~/core/entry'
import env from '~/core/env'
import appRequestIns from '~/core/request'
import globalStyle from '~/styled/global'

// 定义用到的主题变量, 可以扩展需要的主题
declare module 'styled-components' {
  export interface DefaultTheme extends AppThemeVariable {}
}

// 存在 APP 实例多次创建的情况
const appConfig: DeepPartial<AppConfig> = {
  entry,
  env,
  request: appRequestIns,
  styled: {
    globalStyle,
  },
  constants: {
    enableBackTop: true,
    loginRoute,
    routePrefix: () => {
      // 动态 pathPrefix
      const math = /.*\/app\/\w*\//.exec(window.location.pathname)
      return math ? math[0] : '/app/'
    },
  },
  amis: {
    definitions: schemaDefinitions,
    affixOffsetTop: 60,
  },
}

const renderOvineApp = (props) => {
  app.create(cloneDeep(appConfig) as AppConfig).then(() => {
    const { container } = props
    initLogger(app.env.logger)
    ReactDOM.render(
      <App />,
      container ? container.querySelector(appRootSelector) : document.querySelector(appRootSelector)
    )
  })
  set(window, 'ovine.app', app)
}

export default renderOvineApp
