import { getStore, setStore } from '@core/utils/store'
import { publish, subscribe } from '@core/utils/message'
import { msgKey, storeKey } from './constants'
import { isStrTrue, runWithQianKun } from './utils'
import { defaults, pick } from 'lodash'
import { CustomType } from './types'

// 设置站点自定义信息
const applySiteCustom = (custom: any = store.custom) => {
  const { name, favicon, logo } = custom
  if (name) {
    document.title = name
    $('link[rel="shortcut icon"]').attr('href', favicon || logo)
  }
}

// 获取缓存信息
const getCacheStore = () => {
  let appInfo: any = getStore(storeKey.appInfo) || {}
  let orgInfo: any = getStore(storeKey.orgInfo) || {}
  let custom: any = getStore(storeKey.siteCustom) || {}

  applySiteCustom(custom)

  return {
    appInfo,
    orgInfo,
    custom,
  }
}

let store = getCacheStore()

export const isAppIsolation = (exact: boolean = false, appInfo: any = store.appInfo) => {
  // 未在 qiankun 中，默认为独立应用，仅在测试环境有效，生产环境不允许篡改 isolation 独立应用功能。
  const isDevIsolation = process.env.NODE_ENV !== 'production' && !runWithQianKun()

  const isExactIsolation = isStrTrue(appInfo.isolation)

  if (exact === true) {
    return isExactIsolation
  }

  return isExactIsolation || isDevIsolation
}

export const getAppInfo = () => store.appInfo
export const getOrgInfo = () => store.orgInfo

export const setAppCustom = (source: any) => {
  const { appInfo, orgInfo } = source

  // 合并 组织与应用的设置信息
  let info = {
    ...orgInfo,
    ...appInfo,
  }

  if (!isAppIsolation(true)) {
    info = {
      ...orgInfo,
      ...pick(appInfo, ['title', 'logo']),
    }
  }

  setStore(storeKey.siteCustom, info)
  store = getCacheStore()
}

export const getAppCustom = (): CustomType => {
  const info = store.custom
  const defImg = 'https://static.igroupes.com/ovine_bg_cxd.jpeg'

  return defaults(info, {
    app_root_route: '/',
    login_bg_img: defImg,
    login_intro_img: defImg,
    login_logo: info.logo,
    login_title: info.title,
  })
}

export const getOrgId = () => store.orgInfo.id
