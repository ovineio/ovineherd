import { useContext, createContext } from 'react'

import { ImmerSetter } from '@core/utils/hooks'

export type CustomType = {
  logo: string // 企业标志
  title: string // 企业标题
  slogan: string // 企业标语
  isolation: boolean // 是否独立
}

// type UserInfo = {
//   avatar: string // 头像
//   nickname: string // 昵称
//   realName: string // 真实名字
//   username: string // 登录账号
//   type: string
// }

export type AppContextState = {
  custom: CustomType
  setContext: ImmerSetter<AppContextState>
}

export const initState = {
  custom: {
    logo: '',
    title: '',
    slogan: '',
    type: '',
    isolation: false,
  },
  setContext: () => {
    //
  },
}

export const AppContext = createContext<AppContextState>(initState)

export const useAppContext = () => useContext(AppContext)
