import { useEffect } from 'react'

import { useImmer } from '@ovine/core/lib/utils/hooks'

import { CustomType, initState, useAppContext } from '~/components/app/context'
import { request } from '~/core/api'
import { relation } from '~/core/constants'
import { getOrgId } from '~/core/utils'

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
  const orgId = getOrgId()

  const { sys, org } = state

  const getSysCustom = () => {
    request('config.list', {
      onlyOne: true,
      query: {
        type: relation.system,
      },
    }).then((source: any) => {
      setState((d) => {
        source.isLoad = true
        d.sys = source
      })
    })
  }

  const getOrgCustom = () => {
    request('config.list', {
      onlyOne: true,
      query: {
        type: relation.org,
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
