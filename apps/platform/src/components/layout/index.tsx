import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import SysRoutes from '~/routes/sys'

import Header from './header'
import * as S from './styled'

const menus = {
  org: [
    {
      label: '应用',
      link: 'application',
    },
    {
      label: '团队',
      link: 'team',
    },
    {
      label: '角色',
      link: 'role',
    },
    {
      label: '设置',
      link: 'setting',
    },
  ],
  sys: [
    {
      label: '组织',
      link: 'org',
    },
    {
      label: '平台用户',
      link: 'user',
    },
    {
      label: '设置',
      link: 'setting',
    },
  ],
}

type LayoutProps = {
  type: 'sys' | 'org'
  children: any
}
export default (props) => {
  const { children, type } = props
  const { path, url } = useRouteMatch()

  return (
    <S.Layout>
      <Header menus={menus[type]} urlPrefix={url} />
      <S.Body className="py-4">
        <SysRoutes pathPrefix={path} />
        {children}
      </S.Body>
    </S.Layout>
  )
}
