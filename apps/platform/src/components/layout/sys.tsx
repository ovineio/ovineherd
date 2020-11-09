import React from 'react'
import { useRouteMatch } from 'react-router-dom'

import SysRoutes from '~/routes/sys'

import Header from './header'
import * as S from './styled'

const menus = [
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
]

export default (props) => {
  const { children } = props
  const { path, url } = useRouteMatch()

  return (
    <S.Layout>
      <Header type="sys" menus={menus} urlPrefix={url} />
      <S.Body className="py-4">
        <SysRoutes pathPrefix={path} />
        {children}
      </S.Body>
    </S.Layout>
  )
}
