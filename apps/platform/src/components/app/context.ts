import { useContext, createContext } from 'react'

import { ImmerSetter } from '@core/utils/hooks'

import { AppInfo, AppType, CustomType } from '~/core/types'

// type UserInfo = {
//   avatar: string // 头像
//   nickname: string // 昵称
//   realName: string // 真实名字
//   username: string // 登录账号
//   type: string
// }

export type AppContextState = {
  custom: CustomType
  appInfo: AppInfo
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
