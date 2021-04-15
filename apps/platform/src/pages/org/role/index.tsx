import React from 'react'

import Tabs from '~/components/tabs'

import { useSchema } from '~/core/hooks'
import { checkOrgLimit } from '~/core/user'

import { getOrgRoleApi } from './api'
import { orgRoleSchema } from './schema'
import * as S from './styled'

export default () => {
  const pageSchema = useSchema({
    schema: orgRoleSchema,
    getApis: getOrgRoleApi,
    schemaProps: {
      data: {
        addRole: checkOrgLimit('orgRole/addRole'),
        editRole: checkOrgLimit('orgRole/editRole'),
        setLimit: checkOrgLimit('orgRole/editLimit'),
        delRole: checkOrgLimit('orgRole/delRole'),
        roleMember: checkOrgLimit('orgRole/editMember'),
      },
    },
  })

  return (
    <S.StyledRole className="container">
      <h5 className="m-b-md">角色管理</h5>
      <Tabs>{pageSchema}</Tabs>
    </S.StyledRole>
  )
}
