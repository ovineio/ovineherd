/**
 *  一些工具方法
 */

import { get } from 'lodash'

import { app } from '@core/app'

import { relation } from './constants'
import { AppType } from './types'

// app类型检测
const checkAppType = (appType: AppType, type?: AppType, pathName?: string) => {
  if (type) {
    return type === appType
  }
  const pathname = pathName || window.location.pathname
  const path = `${app.constants.pathPrefix}${appType}`
  return pathname.startsWith(`${path}/`) || pathname === path
}

// 平台检测
export const isSys = (type?: AppType) => checkAppType('sys', type)

// 组织检测
export const isOrg = (type?: AppType) => checkAppType('org', type)

export const isSysAdmLogin = (path: string = window.location.pathname) =>
  path.indexOf('/sys/admin') > -1

export const getAppType = (pathName?: string): AppType =>
  checkAppType('org', undefined, pathName) ? 'org' : 'sys'

// 获取组织ID
export const getOrgId = (): string =>
  get(window.location.pathname.match(/\/org\/((\w)+)\//), '1') || ''

type LinkType = 'home' | 'login' | 'selfInfo' | 'app'
export const getLink = (type: LinkType, orgId: string = getOrgId(), extra?: any): string => {
  switch (type) {
    case 'login':
      return orgId ? `/org/${orgId}/login` : isSys() ? '/sys/admin' : '/sys/login'
    case 'selfInfo':
      return orgId ? `/org/${orgId}/setting?t=1#userInfo` : '/sys/setting?t=1#userInfo'
    case 'home':
      return orgId ? `/org/${orgId}/` : '/sys/'
    case 'app':
      return `/app/${extra}`
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

export function getOrgUniType(type: 'user', orgId = getOrgId()) {
  switch (type) {
    case 'user':
      return `${relation.org.user.type}_${orgId}`
    default:
      return ''
  }
}
