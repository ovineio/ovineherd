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
import { getAppType, getOrgId } from '~/core/utils'

// 获取 应用 基本信息
function useAppInfo() {
  const location = useLocation()
  const { pathname } = location

  const appInfo: AppInfo = useMemo(() => {
    const type = getAppType(`${app.constants.baseUrl}${pathname.slice(1)}`)
    const isOrg = type === 'org'
    const orgId = isOrg ? getOrgId() : ''
    return { isOrg, orgId, type, isSys: !isOrg }
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

// 获取 应用配置 -- 将配置存入本地
export const useAppConfig = () => {
  const [state, setState] = useImmer<CustomState>({})
  const { setContext } = useAppContext()
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
      const custom = org.slogan ? org : sys
      const info = {
        ...initState.custom,
        ...custom,
      }
      d.custom = info
      setStore(storeKey.siteCustom, info)
    })
  }, [org, sys])
}

export function useUserInfo(option: { isLogin: boolean }) {
  const { setContext } = useAppContext()
  const { isLogin } = option

  const fetchInfo = () => {
    fetchUserInfo().then((userInfo) => {
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
