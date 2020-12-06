import { getStore } from '@core/utils/store'
import { subscribe } from '@core/utils/message'
import { msgKey, storeKey } from './constants'
import { runWithQianKun } from './utils'

// 获取缓存信息
const getCacheStore = () => {
  let appInfo: any = getStore(storeKey.appInfo) || {}
  let orgInfo: any = getStore(storeKey.orgInfo) || {}
  let custom: any = getStore(storeKey.siteCustom) || {}

  setSiteCustom(custom)

  return {
    appInfo,
    orgInfo,
    custom,
  }
}

let store = getCacheStore()
subscribe(msgKey.updateAppCustom, () => {
  store = getCacheStore()
})

// 设置站点自定义信息
export const setSiteCustom = (custom: any = store.custom) => {
  const { title, favicon } = custom
  if (title) {
    document.title = title
    $('link[rel="shortcut icon"]').attr('href', favicon)
  }
}

export const isAppIsolation = () => {
  // 未在 qiankun 中，默认为独立应用，仅在测试环境有效，生产环境不允许篡改 isolation 独立应用功能。
  const isDevIsolation = process.env.NODE_ENV !== 'production' && !runWithQianKun()

  return !!store.appInfo.isolation || isDevIsolation
}

export const getAppInfo = () => store.appInfo
export const getOrgInfo = () => store.orgInfo
export const getAppCustom = () => store.custom

export const getOrgId = () => store.appInfo.id
