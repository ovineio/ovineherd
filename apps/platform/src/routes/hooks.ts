import { useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { app } from '@ovine/core/lib/app'
import { useImmer } from '@ovine/core/lib/utils/hooks'

import { initState, useAppContext } from '~/components/app/context'
import { requestApi } from '~/core/api'
import { entityType } from '~/core/constants'
import { AppInfo, CustomType } from '~/core/types'
import { getAppType, getOrgId } from '~/core/utils'

// 获取 应用 信息
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
export const useCustom = () => {
  const [state, setState] = useImmer<CustomState>({})
  const { setContext } = useAppContext()
  const appInfo = useAppInfo()

  const { orgId } = appInfo
  const { sys, org } = state

  const getSysCustom = () => {
    requestApi('config', 'list', {
      onlyOne: true,
      type: entityType.system,
    }).then((source: any) => {
      setState((d) => {
        source.isLoad = true
        d.sys = source
      })
    })
  }

  const getOrgCustom = () => {
    requestApi('config', 'list', {
      onlyOne: true,
      type: entityType.org,
      query: {
        relation1: orgId,
      },
    }).then((source: any) => {
      setState((d) => {
        source.isLoad = true
        d.org = source
      })
    })
  }

  useEffect(() => {
    getSysCustom()
    if (orgId) {
      getOrgCustom()
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
    getOrgCustom()
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
    })
  }, [org, sys])
}
