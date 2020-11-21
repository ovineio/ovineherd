import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { app } from '@core/app'
import { useImmer } from '@core/utils/hooks'
import { subscribe } from '@core/utils/message'
import { setStore } from '@core/utils/store'

import { initState, useAppContext } from '~/components/app/context'
import { orgConfigApi, sysConfigApi } from '~/core/api/resource'
import { msgKey, storeKey } from '~/core/constants'
import { AppInfo, CustomType } from '~/core/types'
import { fetchUserInfo } from '~/core/user'
import { getAppType, getOrgId, isSysAdmLogin } from '~/core/utils'

// 获取 应用 基本信息
function useAppInfo() {
  const location = useLocation()
  const { pathname } = location

  const appInfo: AppInfo = useMemo(() => {
    const type = getAppType(`${app.constants.baseUrl}${pathname.slice(1)}`)

    const isOrg = type === 'org'
    const orgId = isOrg ? getOrgId() : ''
    return { isOrg, orgId, type, isSysAdmLogin: isSysAdmLogin(pathname), isSys: !isOrg }
  }, [pathname])

  return appInfo
}

type CustomData = Partial<
  CustomType & {
    isLoad: boolean
  }
>
type CustomState = {
  sys?: CustomData
  org?: CustomData
}

// 应用的配置信息
export const useAppConfig = () => {
  const [state, setState] = useImmer<CustomState>({})
  const { custom, setContext } = useAppContext()
  const appInfo = useAppInfo()

  const { orgId } = appInfo
  const { sys, org } = state

  const getSysConfig = () => {
    sysConfigApi().then((source: any) => {
      setState((d) => {
        source.isLoad = true
        d.sys = source
      })
    })
  }

  const getOrgConfig = () => {
    orgConfigApi({ orgId }).then((source: any) => {
      setState((d) => {
        source.isLoad = true
        d.org = source
      })
    })
  }

  useEffect(() => {
    getSysConfig()
    if (orgId) {
      getOrgConfig()
    } else {
      setState((d) => {
        d.org = {
          isLoad: true,
        }
      })
    }
  }, [])

  // 设置自定义信息
  useEffect(() => {
    const { title, favicon } = custom
    if (title) {
      document.title = title
      $('link[rel="shortcut icon"]').attr('href', favicon)
    }
  }, [custom])

  useEffect(() => {
    setContext((d) => {
      d.appInfo = appInfo
    })
  }, [appInfo])

  useEffect(() => {
    if (!org?.isLoad) {
      return
    }
    getOrgConfig()
  }, [orgId])

  useEffect(() => {
    if (!org?.isLoad || !sys?.isLoad) {
      return
    }

    setContext((d) => {
      // 暂时先忽略 slogan 配置
      // const conf = org.slogan ? org : sys
      const info = {
        ...initState.custom,
        ...sys,
        ...org,
      }
      d.custom = info
      setStore(storeKey.siteCustom, info)
    })
  }, [org, sys])
}

// 获取用户信息
export function useUserInfo(option: { isLogin: boolean }) {
  const { setContext } = useAppContext()
  const { isLogin } = option

  const fetchInfo = () => {
    fetchUserInfo().then((userInfo: any) => {
      // console.log('@===>',userInfo)
      setContext((d) => {
        d.userInfo = userInfo
      })
    })
  }

  useEffect(() => {
    if (!isLogin) {
      return
    }
    fetchInfo()
    subscribe(msgKey.updateSelfInfo, fetchInfo)
  }, [isLogin])
}
