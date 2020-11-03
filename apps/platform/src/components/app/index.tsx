import { AlertComponent, ToastComponent, ContextMenu } from 'amis'
import React from 'react'
import { Switch, Router, Route } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import { app } from '@core/app'
import GlobalStyle from '@core/styled/global'

import Login from '~/pages/login'

import Layout from '../layout'
import { AppStyle } from './styled'

export default () => {
  const theme = app.theme.getName()

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
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Layout} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
}
