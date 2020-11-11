/**
 *  一些工具方法
 */

import { get } from 'lodash'

import { app } from '@ovine/core/lib/app'

import { AppType } from './types'

// app类型检测
const checkAppType = (appType: AppType, type: AppType) => {
  if (type) {
    return type === appType
  }
  const { pathname } = window.location
  const path = `${app.constants.baseUrl}${appType}`
  return pathname.startsWith(`${path}/`) || pathname === path
}

// 平台检测
export const isSys = (type?: AppType) => checkAppType('sys', type)

// 组织检测
export const isOrg = (type?: AppType) => checkAppType('org', type)

// 获取组织ID
export const getOrgId = (): string =>
  get(window.location.pathname.match(/\/org\/(.+)\//), '1') || ''
