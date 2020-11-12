import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import App from '~/pages/org/application'
import Role from '~/pages/org/role'
import Setting from '~/pages/org/setting'
import Team from '~/pages/org/team'

export default (props: any) => {
  const { pathPrefix } = props

  return (
    <Switch>
      <Route exact path={`${pathPrefix}`}>
        <Redirect to={`${pathPrefix}application`} />
      </Route>
      <Route path={`${pathPrefix}application`}>
        <App />
      </Route>
      <Route path={`${pathPrefix}team`}>
        <Team />
      </Route>
      <Route path={`${pathPrefix}role`}>
        <Role />
      </Route>
      <Route path={`${pathPrefix}setting`}>
        <Setting />
      </Route>
    </Switch>
  )
}
