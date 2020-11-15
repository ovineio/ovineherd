/**
 *  一些工具方法
 */

import { get } from 'lodash'

import { app } from '@core/app'

import { AppType } from './types'

// app类型检测
const checkAppType = (appType: AppType, type?: AppType, pathName?: string) => {
  if (type) {
    return type === appType
  }
  const pathname = pathName || window.location.pathname
  const path = `${app.constants.baseUrl}${appType}`
  return pathname.startsWith(`${path}/`) || pathname === path
}

// 平台检测
export const isSys = (type?: AppType) => checkAppType('sys', type)

// 组织检测
export const isOrg = (type?: AppType) => checkAppType('org', type)

export const getAppType = (pathName?: string): AppType =>
  checkAppType('org', undefined, pathName) ? 'org' : 'sys'

// 获取组织ID
export const getOrgId = (): string =>
  get(window.location.pathname.match(/\/org\/(.+)\//), '1') || ''

type LinkType = 'login' | 'selfInfo'
export const getLink = (type: LinkType, orgId: string = getOrgId()): string => {
  switch (type) {
    case 'login':
      return orgId ? `/org/${orgId}/login` : '/sys/login'
    case 'selfInfo':
      return orgId ? `/org/${orgId}/setting?#userInfo` : '/sys/setting?#userInfo'
    default:
      return '/'
  }
}

export function getTextWidth(text: string = '') {
  const dom = document.createElement('span')
  dom.style.display = 'inline-block'
  dom.textContent = text
  document.body.appendChild(dom)
  const width = dom.clientWidth
  document.body.removeChild(dom)
  return width
}

export function isStrTrue(str: string) {
  return str === '1'
}
