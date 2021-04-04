import { AlertComponent, ToastComponent, ContextMenu } from 'amis'
import React from 'react'
import { hot } from 'react-hot-loader/root'
import { Switch, Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { app } from '@core/app'
import BactTop from '@core/components/back_top'
import GlobalStyle from '@core/styled/global'
import { useImmer } from '@core/utils/hooks'

import { useRouteBySubApp } from '~/core/hooks'
import Login from '~/pages/login'
import Register from '~/pages/register'
import { PrivateRoute, ConfigRoute } from '~/routes/route'

import Layout from '../layout'
import { initState, AppContext, AppContextState } from './context'
import { AppStyle } from './styled'

export type State = Omit<AppContextState, 'setContext'> & {
  theme: string
}

export default hot(() => {
  const [state, setState] = useImmer<State>({
    ...initState,
    theme: app.theme.getName(),
  })

  const { theme } = state
  const contextValue = { ...state, setContext: setState as any }

  useRouteBySubApp()

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
      <BactTop />
      <ThemeProvider theme={app.theme.getTheme()}>
        <GlobalStyle />
        <AppStyle />
        <AppContext.Provider value={contextValue}>
          <ConfigRoute path="/">
            <Switch>
              <Route path="/org/:orgId/login" component={Login} />
              <Route path="/sys/login" component={Login} />
              <Route path="/sys/admin" component={Login} />
              <Route path="/sys/register" component={Register} />

              <PrivateRoute path="/">
                <Route path="/org/:orgId/" component={Layout} />
                <Route path="/sys/" component={Layout} />
              </PrivateRoute>
              <Route path="*" component={() => <div>404</div>} />
            </Switch>
          </ConfigRoute>
        </AppContext.Provider>
      </ThemeProvider>
    </Router>
  )
})
