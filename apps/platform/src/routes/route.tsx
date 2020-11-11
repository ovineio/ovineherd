import React from 'react'
import { Redirect, Route, useParams } from 'react-router-dom'

import { useAppContext } from '~/components/app/context'
import { isLogin } from '~/core/user'

import { useCustom } from './hooks'

// 用于读取自定义配置
export const CustomRoute = (props) => {
  useCustom()
  return props.children
}

// 用于登录拦截
export const PrivateRoute = ({ children, ...rest }) => {
  const { custom } = useAppContext()
  const { orgId } = useParams<{ orgId: string }>()

  const isLoginApp = isLogin(custom.isolation)
  const redirect = orgId ? `/org/${orgId}/login` : '/sys/login'

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoginApp ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
