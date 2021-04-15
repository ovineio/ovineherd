/**
 * ovine 应用入口
 */

/* eslint-disable no-console */
import './public_path'
import '@core/app/includes'

import ReactDOM from 'react-dom'

import { appRootSelector } from '~/core/constants'

import renderOvineApp from './ovine'

import '~/components/renderer'

if (!window.__POWERED_BY_QIANKUN__) {
  renderOvineApp({})
}

export async function bootstrap() {
  //
}

export async function mount(props) {
  renderOvineApp(props)
}

export async function unmount(props) {
  const { container } = props
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector(appRootSelector) : document.querySelector(appRootSelector)
  )
}
