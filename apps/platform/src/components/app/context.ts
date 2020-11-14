import { useContext, createContext } from 'react'

import { ImmerSetter } from '@core/utils/hooks'

import { AppInfo, AppType, CustomType, UserInfo } from '~/core/types'

export type AppContextState = {
  custom: CustomType
  appInfo: AppInfo
  userInfo?: UserInfo
  setContext: ImmerSetter<AppContextState>
}

export const initState: AppContextState = {
  appInfo: {
    type: 'sys' as AppType,
    isSys: true,
    isOrg: false,
    orgId: '',
  },
  custom: {
    logo: '',
    title: '',
    slogan: '',
    isolation: false,
  },
  setContext: () => {
    //
  },
}

export const AppContext = createContext<AppContextState>(initState)

export const useAppContext = () => useContext(AppContext)
