import { last } from 'lodash'
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
    filterSchema: (schema) => {
      const editRole = `${checkOrgLimit('orgRole/editRole')}`
      const setLimit = `${checkOrgLimit('orgRole/editLimit')}`
      const delRole = `${checkOrgLimit('orgRole/delRole')}`

      schema.preset.actions.addRole.visibleOn = `${checkOrgLimit('orgRole/addRole')}`
      schema.preset.actions.roleMember.visibleOn = `${checkOrgLimit('orgRole/editMember')}`
      schema.preset.actions.editRole.visibleOn = editRole
      schema.preset.actions.setLimit.visibleOn = setLimit
      schema.preset.actions.delRole.visibleOn = delRole

      last<any>(schema.body.tabs[0].body.columns).visibleOn = editRole || setLimit || delRole

      return schema
    },
  })

  return (
    <S.StyledRole className="container">
      <h5 className="m-b-md">角色管理</h5>
      <Tabs>{pageSchema}</Tabs>
    </S.StyledRole>
  )
}
