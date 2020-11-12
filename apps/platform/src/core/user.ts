/**
 * 用户模块
 */

// import { toast } from 'amis'

import { getStore, setStore } from '@core/utils/store'

import { requestApi } from './api'
import { entityType, storeKey } from './constants'
import { AppType } from './types'
import { isOrg, isSys } from './utils'

const userInfo: any = getStore(storeKey.userInfo) || {}

export async function onAuth() {
  // try {
  //   await fetchUserInfo()
  //   // 检查用户接口权限字符串
  // } catch (_) {
  //   //
  // }
  // return false
  return true
}

// 根据 token 获取用户信息
export async function fetchUserInfo(id: string) {
  return requestApi('user', 'one', { id }).then((source) => {
    setStore(storeKey.userInfo, source)
  })
}

// 获取缓存的用户信息
export function getUserInfo() {
  return userInfo
}

// 退出登录
// export function logout(option?: { tip?: string;}) {
//   const { tip = '您已经成功退出登录', useApi = false } = option || {}

//   app.routerHistory.push('/login')
//   toast.info(tip, '系统提示')
//   clearStore(storeKey.auth)

//   if (useApi) {
//     app.request({ api: 'asd' })
//   }
// }

// 判断用户是否是登陆状态
export function isLogin(type?: AppType, isolation: boolean = false) {
  const withAuth = !!getStore(storeKey.auth)

  if (!withAuth) {
    return false
  }

  if (isSys(type) && isSysUser()) {
    return true
  }

  if (isOrg(type)) {
    if (isolation) {
      return isOrgUser()
    }
    return true
  }

  return false
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
  return info.type === entityType.orgUser
}

export function userLogin(data: any) {
  return requestApi(
    'user',
    'login',
    {
      ...data,
      onlyData: false,
      type: entityType.systemUser,
    },
    {
      onSuccess: (source) => {
        source.code = source.status
        source.status = 0
        return source
      },
    }
  )
}

export function userLogout() {
  //
}
