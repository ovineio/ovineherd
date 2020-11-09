/**
 * 用户模块
 */

import { toast } from 'amis'

import { app } from '@core/app'
import { clearStore, getStore } from '@core/utils/store'

import { storeKeys } from './constants'

let userInfo: any = {}

export async function onAuth() {
  try {
    await fetchUserInfo()
    // 检查用户接口权限字符串
  } catch (_) {
    //
  }
  return false
}

// 从接口获取用户信息
export async function fetchUserInfo() {
  return app
    .request({
      api: 'asd',
    })
    .then((source) => {
      userInfo = source.data.data
      return userInfo
    })
}

// 获取缓存的用户信息
export function getUserInfo(callback?: (info: any) => void) {
  if (callback) {
    fetchUserInfo().then(callback)
  }
  return userInfo
}

// 退出登录
export function logout(option?: { tip?: string; useApi?: boolean }) {
  const { tip = '您已经成功退出登录', useApi = false } = option || {}

  app.routerHistory.push('/login')
  toast.info(tip, '系统提示')
  clearStore(storeKeys.auth)

  if (useApi) {
    app.request({ api: 'asd' })
  }
}

// 判断用户是否是登陆状态
export function isLogin() {
  return !!getStore(storeKeys.auth)
}
