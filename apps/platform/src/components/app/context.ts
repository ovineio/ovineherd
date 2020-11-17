import { useContext, createContext } from 'react'

import { ImmerSetter } from '@core/utils/hooks'
import { getStore } from '@core/utils/store'

import { storeKey } from '~/core/constants'
import { AppInfo, AppType, CustomType, UserInfo } from '~/core/types'
import { getUserInfo } from '~/core/user'

export type AppContextState = {
  custom: Partial<CustomType>
  appInfo: AppInfo
  userInfo: Partial<UserInfo>
  setContext: ImmerSetter<AppContextState>
}

export const initState: AppContextState = {
  appInfo: {
    type: 'sys' as AppType,
    isSys: true,
    isOrg: false,
    orgId: '',
    isSysAdmLogin: true,
  },
  userInfo: getUserInfo(),
  custom: getStore<CustomType>(storeKey.siteCustom) || {},
  setContext: () => {
    //
  },
}

export const AppContext = createContext<AppContextState>(initState)

export const useAppContext = () => useContext(AppContext)
