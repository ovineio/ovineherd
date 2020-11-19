/* eslint-disable no-console */
import './public_path'
import '@core/app/includes'

import React from 'react'
import ReactDOM from 'react-dom'

import { app } from '@core/app'
import { AppConfig } from '@core/app/types'
import { initLogger } from '@core/utils/logger'
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
  amis: {
    definitions: schemaDefinitions,
    affixOffsetTop: 60,
  },
  // constants: {
  //   baseUrl: window.__POWERED_BY_QIANKUN__ ? '/platform/' : '/',
  // },
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

function storeTest(props) {
  props.onGlobalStateChange(
    (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
    true
  )
  props.setGlobalState({
    ignore: props.name,
    user: {
      name: props.name,
    },
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
  storeTest(props)
  render(props)
}

export async function unmount(props) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector(appRootId) : document.querySelector(appRootId)
  )
}
