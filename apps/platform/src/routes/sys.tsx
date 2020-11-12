import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Org from '~/pages/sys/org'
import Setting from '~/pages/sys/setting'
import User from '~/pages/sys/user'

type Props = {
  pathPrefix: string
}
export default (props: Props) => {
  const { pathPrefix } = props

  return (
    <Switch>
      <Route exact path={`${pathPrefix}`}>
        <Redirect to={`${pathPrefix}org`} />
      </Route>
      <Route path={`${pathPrefix}user`} component={User} />
      <Route path={`${pathPrefix}org`} component={Org} />
      <Route path={`${pathPrefix}setting`} component={Setting} />
    </Switch>
  )
}
