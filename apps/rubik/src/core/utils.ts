/**
 *  一些工具方法
 */

import { get } from 'lodash'

import { app } from '@core/app'

import { getAppCustom, getOrgId } from './common'
import { loginRoute, orgPathPrefix, relation, sysAdmRoutePrefix } from './constants'

// 获取组织ID
export const getAppId = (pathname: string = window.location.pathname): string =>
  get(pathname.match(/\/app\/(\w*)\//), '1') || ''

export function getOrgUniType(type: 'user', orgId: string = getOrgId()) {
  switch (type) {
    case 'user':
      return `${relation.org.user.type}_${orgId}`
    default:
      return ''
  }
}

// TODO: 处理多环境问题
export function getSiteEnv(pathname: string = window.location.pathname) {
  return get(pathname.match(/\/app\/(\w*)\/([dev|pre|prd])\//), '2') || 'prd'
}

export function getAppUniType(type: 'user', appId = getAppId()) {
  switch (type) {
    case 'user':
      return `${relation.app.user.type}_${appId}`
    default:
      return ''
  }
}

export const isSysAdminRoute = (pathname: string = window.location.pathname): boolean => {
  return pathname.startsWith(`${app.constants.routePrefix.slice(0, -1)}${sysAdmRoutePrefix}`)
}

type LinkType = 'home' | 'login' | 'selfInfo' | 'appSystem'
export const getLink = (type: LinkType, orgId?: string, extra?: any): string => {
  switch (type) {
    case 'login':
      return orgId ? `${orgPathPrefix}${orgId}/login` : loginRoute
    case 'selfInfo':
      return orgId ? `${orgPathPrefix}${orgId}/setting?#userInfo` : '/system/self?#userInfo'
    case 'home':
      return orgId ? `${orgPathPrefix}${orgId}/application` : getAppCustom().app_root_route
    case 'appSystem':
      // 共用参数第二参数
      return `${sysAdmRoutePrefix}${extra || orgId}`
    default:
      return '/'
  }
}

export const linkTo = (link: string) => {
  if (link.startsWith(orgPathPrefix)) {
    // location.href = link
    window.history.pushState(null, link, link)
    return
  }
  app.routerHistory.push(link)
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
