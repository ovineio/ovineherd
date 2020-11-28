import React from 'react'
import ReactDOM from 'react-dom'

import { app } from '@core/app'
import { initLogger } from '@core/utils/logger'
import { App } from '@core/components/app'

import { DeepPartial } from '@core/utils/types'
import { AppConfig } from '@core/app/types'

import { schemaDefinitions } from '~/core/amis'
import { appRootSelector } from '~/core/constants'
import env from '~/core/env'
import entry from '~/core/entry'
import appRequestIns from '~/core/request'

const appConfig: DeepPartial<AppConfig> = {
  request: appRequestIns,
  entry,
  env: env,
  constants: {
    pathPrefix: () => {
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
  app.create(appConfig as AppConfig).then(() => {
    const { container } = props
    initLogger(app.env.logger)
    ReactDOM.render(
      <App />,
      container ? container.querySelector(appRootSelector) : document.querySelector(appRootSelector)
    )
  })
}

export default renderOvineApp
