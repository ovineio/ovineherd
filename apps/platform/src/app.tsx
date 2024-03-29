/* eslint-disable no-console */
import './public_path'
import '@core/app/includes'

import React from 'react'
import ReactDOM from 'react-dom'

import { app } from '@core/app'
import { AppConfig } from '@core/app/types'
import { initLogger } from '@core/utils/logger'
import { unsubscribeAll } from '@core/utils/message'
import { DeepPartial } from '@core/utils/types'

import App from './components/app'
import { schemaDefinitions } from './core/amis'
import appEnv from './core/env'
import appRequestIns from './core/request'

import './icons'

const appRootId = '#app-root'

const appConfig: DeepPartial<AppConfig> = {
  request: appRequestIns,
  env: appEnv,
  constants: {
    routePrefix: '/platform/center/',
  },
  amis: {
    definitions: schemaDefinitions,
    affixOffsetTop: 60,
  },
}

function render(props) {
  app.create(appConfig as AppConfig).then(() => {
    const { container } = props
    initLogger(app.env.logger)
    ReactDOM.render(
      <App />,
      container ? container.querySelector(appRootId) : document.querySelector(appRootId)
    )
  })
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped')
}

export async function mount(props) {
  console.log('[react16] props from main framework', props)
  render(props)
}

export async function unmount(props) {
  const { container } = props
  unsubscribeAll()
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector(appRootId) : document.querySelector(appRootId)
  )
}

const { hot } = module as any
if (hot) {
  hot.accept((err: Error) => {
    // eslint-disable-next-line
    console.error('An error occurred when hot reload.', err)
  })
}
