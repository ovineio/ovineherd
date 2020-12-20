/**
 * 用户模块
 */

// import { toast } from 'amis'

import { getStore, setStore } from '@core/utils/store'

import { userSelfInfoApi } from './api/resource'
import { entityType, storeKey } from './constants'
import { AppType } from './types'
import { isOrg, isSys } from './utils'

let userInfo: any = getStore(storeKey.userInfo) || {}

// 根据 token 获取用户信息
export async function fetchUserInfo() {
  // console.log('@===>', getUserId())
  // TODO: 校验，如果当前用户 的组织ID不是，当前OrgId 直接清除登录信息
  return userSelfInfoApi({ id: getUserId() }).then((source) => {
    // TODO: 获取权限信息,设置到用户信息上
    setUserInfo(source)
    return source
  })
}

export function setUserInfo(info: any) {
  userInfo = info
  setStore(storeKey.userInfo, info)
}

// 获取缓存的用户信息
export function getUserInfo() {
  return userInfo || getStore(storeKey.userInfo) || {}
}

// 判断用户是否是登陆状态
export function isLogin(type?: AppType) {
  const withAuth = !!getStore(storeKey.auth)
  // debugger
  if (!withAuth) {
    return false
  }

  if (isSys(type) && isSysUser()) {
    return true
  }

  if (isOrg(type)) {
    return isOrgUser()
  }

  return false
}

export function getToken() {
  return getStore(storeKey.auth) || ''
}

// 获取用户ID
export function getUserId() {
  return userInfo.id
}

// 是否是 平台用户
export function isSysUser(info = userInfo) {
  return info.type === entityType.systemUser
}

// 是否是 组织用户
export function isOrgUser(info = userInfo) {
  return info.type.indexOf(entityType.orgUser) === 0
}
