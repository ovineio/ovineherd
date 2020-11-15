import { AlertComponent, ToastComponent, ContextMenu } from 'amis'
import React, { useEffect } from 'react'
import { Switch, Router, Route } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import { app } from '@core/app'
import GlobalStyle from '@core/styled/global'
import { useImmer } from '@core/utils/hooks'

import Login from '~/pages/login'
import Register from '~/pages/register'
import { PrivateRoute, ConfigRoute } from '~/routes/route'

import Layout from '../layout'
import { initState, AppContext, AppContextState } from './context'
import { AppStyle } from './styled'

export type State = Omit<AppContextState, 'setContext'> & {
  theme: string
}

export default () => {
  const [state, setState] = useImmer<State>({
    ...initState,
    theme: app.theme.getName(),
  })

  const { custom, theme } = state
  const contextValue = { ...state, setContext: setState as any }

  useEffect(() => {
    const { title, favicon } = custom
    if (title) {
      document.title = title
      $('link[rel="shortcut icon"]').attr('href', favicon)
    }
  }, [custom])

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
          <ConfigRoute path="/">
            <Switch>
              <Route path="/org/:orgId/login" component={Login} />
              <Route path="/sys/login" component={Login} />
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
}