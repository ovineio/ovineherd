import { useContext, createContext } from 'react'

import { ImmerSetter } from '@core/utils/hooks'

export type AppContextState = {
  userInfo: any
  setContext: ImmerSetter<AppContextState>
}

export const AppContext = createContext<AppContextState>({
  userInfo: {},
  setContext: () => {
    //
  },
})

export const useAppContext = () => useContext(AppContext)
