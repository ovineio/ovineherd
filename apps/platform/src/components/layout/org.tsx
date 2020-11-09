import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import OrgRoutes from '~/routes/org'

import Header from './header'
import * as S from './styled'

const menus = [
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
]

export default (props) => {
  const { children } = props
  const { path, url } = useRouteMatch()

  return (
    <S.Layout>
      <Header type="org" menus={menus} urlPrefix={url} />
      <S.Body className="py-4">
        <OrgRoutes pathPrefix={path} />
        {children}
      </S.Body>
    </S.Layout>
  )
}
