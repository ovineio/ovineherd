import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { getOrgLimit } from '~/core/user'
import { getLink, linkTo } from '~/core/utils'

import App from '~/pages/org/application'
import Role from '~/pages/org/role'
import Setting from '~/pages/org/setting'
import Team from '~/pages/org/team'

export default (props: any) => {
  const { pathPrefix } = props

  const limit = getOrgLimit('pages', { pathPrefix })

  if (!limit.redirect) {
    linkTo(getLink('login'))
    return null
  }

  return (
    <Switch>
      <Route exact path={`${pathPrefix}`}>
        <Redirect to={limit.redirect} />
      </Route>
      {limit.application && (
        <Route path={`${pathPrefix}application`}>
          <App />
        </Route>
      )}
      {limit.team && (
        <Route path={`${pathPrefix}team`}>
          <Team />
        </Route>
      )}
      {limit.role && (
        <Route path={`${pathPrefix}role`}>
          <Role />
        </Route>
      )}
      {limit.setting && (
        <Route path={`${pathPrefix}setting`}>
          <Setting />
        </Route>
      )}
      <Route path="*">
        <div className="container jumbotron">
          <h1 className="display-4 text-center">PAGE NOT FOUND</h1>
          <p className="lead m-b-xxl text-center">
            <i className="fa fa-unlink p-r-md" />
            <span>当前页面不存在</span>
          </p>
        </div>
      </Route>
    </Switch>
  )
}
