import React from 'react'

import Tabs from '~/components/tabs'

import { useSchema } from '~/core/hooks'

import { getOrgRoleApi } from './api'
import { orgRoleSchema } from './schema'
import * as S from './styled'

export default () => {
  const schema = useSchema(
    {
      schema: orgRoleSchema,
      getApis: getOrgRoleApi,
    },
    []
  )
  return (
    <S.StyledRole className="container">
      <h5 className="m-b-md">角色管理</h5>
      <Tabs>{schema}</Tabs>
    </S.StyledRole>
  )
}
