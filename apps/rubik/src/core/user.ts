/**
 * 用户模块
 */

// import { toast } from 'amis'

import { toast } from 'amis'
import { getStore, setStore } from '@core/utils/store'
import { app } from '@core/app'

import { initAppInfoApi, userSelfInfoApi } from './api/resource'
import { getOrgId, isAppIsolation } from './common'
import { entityType, storeKey } from './constants'
import { getAppId, getLink } from './utils'

let orgUserInfo: any = getStore(storeKey.orgUserInfo) || {}
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
  app.constants.loginRoute = getLink('login')
  try {
    await initAppInfoApi()
    if (isAppIsolation()) {
      await fetchUserInfo()
      // 用户 APPID 与 路径上的 APPID 不匹配
      if (!userInfo.id || userInfo.relation2 !== getAppId()) {
        toast.error('登录错误', '当前登录信息有误请重新登录')
        return false
      }
    }
  } catch (e) {
    // TODO: 区别错误原因 并分别提示
    return false
  }

  // 独立应用 并且没有的登录 跳转到 app/login
  if (!isLogin()) {
    if (!isAppIsolation()) {
      // 跳转到组织登录页面
      window.history.pushState({}, undefined, getLink('login', getOrgId()))
    }
    return false
  }

  // 正常登录
  return true
}

// 根据 token 获取用户信息
export async function fetchUserInfo() {
  // console.log('@===>', getUserId())
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
  if (isAppIsolation()) {
    return userInfo || getStore(storeKey.userInfo) || {}
  }
  return orgUserInfo || getStore(storeKey.orgInfo) || {}
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
export function isOrgUser(info = orgUserInfo) {
  return info.type.indexOf(entityType.orgUser) === 0
}
