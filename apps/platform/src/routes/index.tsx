import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from '~/pages/application'
import Role from '~/pages/role'
import Setting from '~/pages/setting'
import Team from '~/pages/team'

export default () => {
  return (
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/app">
        <App />
      </Route>
      <Route path="/role">
        <Role />
      </Route>
      <Route path="/setting">
        <Setting />
      </Route>
      <Route path="/Team">
        <Team />
      </Route>
    </Switch>
  )
}
