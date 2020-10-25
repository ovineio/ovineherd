/* eslint-disable no-console */

import { Button } from 'amis'
import React from 'react'
import ReactDOM from 'react-dom'

import { Amis } from '@core/components/amis/schema'
import { initAppTheme } from '@core/styled/theme'


import './public_path'

const appRootId = '#app-root'

function render(props) {
  const { container } = props
  initAppTheme()
  ReactDOM.render(
    <div>
      <Button>123</Button>
      <Amis schema={{type: 'html', html: 'xx'}} />
    </div>,
    container ? container.querySelector(appRootId) : document.querySelector(appRootId)
  )
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
  console.log('@____>')
  const { container } = props
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector(appRootId) : document.querySelector(appRootId)
  )
}
