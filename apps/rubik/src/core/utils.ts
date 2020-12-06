/**
 *  一些工具方法
 */

import { get } from 'lodash'

import { app } from '@core/app'

import { loginRoute, relation, sysAdmRoutePrefix } from './constants'
import { getOrgId } from './common'

// 获取组织ID
export const getAppId = (pathname: string = window.location.pathname): string =>
  get(pathname.match(/\/app\/(\w*)\//), '1') || ''

export function getOrgUniType(type: 'user', orgId: string) {
  switch (type) {
    case 'user':
      return `${relation.org.user.type}_${orgId}`
    default:
      return ''
  }
}

// TODO: 处理多环境问题
export function getSiteEnv(pathname: string = window.location.pathname) {
  get(pathname.match(/\/app\/(\w*)\/([dev|pre|prd])\//), '2') || 'prd'
}

export function getAppUniType(type: 'user', orgId = getAppId()) {
  switch (type) {
    case 'user':
      return `${relation.org.user.type}_${orgId}`
    default:
      return ''
  }
}

export const isSysAdminRoute = (pathname: string = window.location.pathname): boolean => {
  return pathname.startsWith(`${app.constants.pathPrefix.slice(0, -1)}${sysAdmRoutePrefix}`)
}

type LinkType = 'home' | 'login' | 'selfInfo' | 'app'
export const getLink = (type: LinkType, orgId?: string, extra?: any): string => {
  switch (type) {
    case 'login':
      return orgId ? `/org/${orgId}/login` : loginRoute
    case 'selfInfo':
      return orgId ? `/org/${orgId}/setting?t=1#userInfo` : '/sys/setting?t=1#userInfo'
    case 'home':
      return orgId ? `/org/${orgId}/` : '/sys/'
    case 'app':
      return orgId ? `/org/${orgId}/app/${extra}` : `/app/${extra}`
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

export function runWithQianKun() {
  return !!window.__POWERED_BY_QIANKUN__
}
