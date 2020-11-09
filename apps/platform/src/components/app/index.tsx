import { AlertComponent, ToastComponent, ContextMenu } from 'amis'
import React, { useEffect } from 'react'
import { Switch, Router, Route } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import { app } from '@core/app'
import GlobalStyle from '@core/styled/global'

import { useImmer } from '@core/utils/hooks'

import OrgLogin from '~/pages/org/login'
import SysLogin from '~/pages/sys/login'

import OrgLayout from '../layout/org'
import SysLayout from '../layout/sys'
import { AppContext, AppContextState } from './context'
import { AppStyle } from './styled'

export type State = Omit<AppContextState, 'setContext'> & {
  theme: string
}

export default () => {
  const [state, setState] = useImmer<State>({
    userInfo: {},
    theme: app.theme.getName(),
  })

  const { theme } = state
  const contextValue = { ...state, setContext: setState as any }

  useEffect(() => {
    //
  }, [])

  return (
    <Router history={app.routerHistory}>
      <ToastComponent
        closeButton
        className="m-t-xl"
        theme={theme}
        timeout={app.constants.toastDuration}
      />
      <AlertComponent theme={theme} />
      <ContextMenu theme={theme} />
      <ThemeProvider theme={app.theme.getTheme()}>
        <GlobalStyle />
        <AppStyle />
        <AppContext.Provider value={contextValue}>
          <Switch>
            <Route path="/org/:orgId/login" component={OrgLogin} />
            <Route path="/org/:orgId" component={OrgLayout} />
            <Route path="/sys/login" component={SysLogin} />
            <Route path="/sys/register" component={SysLogin} />
            <Route path="/sys/" component={SysLayout} />
            <Route path="*" component={() => <div>404</div>} />
          </Switch>
        </AppContext.Provider>
      </ThemeProvider>
    </Router>
  )
}
