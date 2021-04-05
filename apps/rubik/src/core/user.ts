/**
 * 用户模块
 */

import { toast } from 'amis'

import { isEmpty } from 'lodash'

import { setAppLimits } from '@core/routes/limit/exports'
import { clearStore, getStore, setStore } from '@core/utils/store'

import { fetchAppInfo, userSelfInfoApi } from './api/resource'
import { getOrgId, isAppIsolation, setStoreInfo } from './common'
import { entityType, loginRoute, storeKey } from './constants'
import { getAppId, getLink, linkTo } from './utils'

const orgUserInfo: any = getStore(storeKey.orgUserInfo) || {}
let userInfo: any = getStore(storeKey.userInfo) || {}

// 校验用户登录状态
/**
 * 1. 组织登录者 与 应用登录者，账号共存
 * 2. 独立应用， 校验是否存在应用登录的信息
 *      1. 未登录，跳转应用登录界面
 *      2. 已登录，校验登录信息是否唯一///不能同时登录几个独立应用
 * 3. 非独立应用，校验组织登录状态
 *      1. 未登录， 跳转当前组织登录页面
 *      2. 已登录，可以通用多个非独立应用登录
 */
export async function onAuth() {
  try {
    const source = await fetchAppInfo()
    setStoreInfo(source)

    if (isAppIsolation(true)) {
      await fetchUserInfo()
      // 用户 APPID 与 路径上的 APPID 不匹配
      if (!userInfo.id || !isAppUser() || (isAppUser() && userInfo.relation2 !== getAppId())) {
        if (window.location.pathname.indexOf(loginRoute) !== -1) {
          toast.error('登录错误', '当前登录信息有误请重新登录')
        }
        clearUserLoginState()
        return false
      }
    }
  } catch (e) {
    // TODO: 区别错误原因 并分别提示
    clearUserLoginState()
    return false
  }

  // 独立应用 并且没有的登录 跳转到 app/login
  if (!isLogin()) {
    clearUserLoginState()

    // 跳转到组织登录页面
    if (!isAppIsolation()) {
      linkTo(getLink('login', getOrgId()), false, true)
    }
    return false
  }

  setAppLimits('*')

  // 正常登录
  return true
}

// 根据 token 获取用户信息
export async function fetchUserInfo() {
  const userId = getUserId()
  if (!userId) {
    return {}
  }

  return userSelfInfoApi({ id: userId }).then((source) => {
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
  if (isAppIsolation()) {
    return userInfo || {}
  }
  return orgUserInfo || {}
}

export function isLogin() {
  return !!getToken()
}

export function getToken() {
  if (isAppIsolation()) {
    return getStore(storeKey.auth) || ''
  }
  const orgAuth = getStore(storeKey.orgAuth)
  return orgAuth && isOrgUser() ? orgAuth : ''
}

// 获取用户ID
export function getUserId() {
  if (isAppIsolation()) {
    return userInfo.id
  }
  return orgUserInfo.id
}

// 是否是 组织用户
export function isOrgUser(info = getUserInfo()) {
  const data = isEmpty(info) ? orgUserInfo : info
  return data.type?.indexOf(entityType.orgUser) === 0
}

export function isAppUser(info = userInfo) {
  return info.type?.indexOf(entityType.appUser) === 0
}

export function clearUserLoginState() {
  clearStore(storeKey.auth)
  clearStore(storeKey.userInfo)
  userInfo = {}
}

export function userLogout() {
  clearUserLoginState()
  linkTo(getLink('login'))
}

export function checkLimit(key: string): boolean {
  if (isOrgUser()) {
    const orgLimit = orgUserInfo.org_limit || {}
    const actions = ['loginApp', 'designApp']

    if (actions.includes(key)) {
      const prefix = `app/${getAppId()}/`
      for (let i = 0; i < actions.length; i++) {
        if ((orgLimit[`orgApp/${key}`] && !orgLimit[prefix + 'ignore']) || orgLimit[prefix + key]) {
          return true
        }
      }
    }

    return false
  }

  return true
}
