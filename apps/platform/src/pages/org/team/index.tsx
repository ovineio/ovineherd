import React from 'react'

import Section from '~/components/section'
import { useSchema } from '~/core/hooks'
import { checkOrgLimit } from '~/core/user'

import { getOrgTeamApis } from './api'
import { getTableRef, tableSchema, treeSchema } from './schema'
import * as S from './styled'

export default () => {
  const teamTree = useSchema({
    schema: treeSchema,
    getApis: getOrgTeamApis,
    filterSchema: (schema) => {
      if (!checkOrgLimit('orgTeam/editTeam')) {
        schema.controls[0] = {
          ...schema.controls[0],
          creatable: false,
          editable: false,
          removable: false,
        }
      }
      return schema
    },
  })

  const userList = useSchema({
    schema: tableSchema,
    getApis: getOrgTeamApis,
    schemaProps: {
      scopeRef: getTableRef,
    },
    filterSchema: (schema) => {
      schema.preset.actions.add.visibleOn = `${checkOrgLimit('orgTeam/addUser')}`
      schema.preset.actions.editUser.visibleOn = `${checkOrgLimit('orgTeam/editUser')}`
      schema.preset.actions.delUser.visibleOn = `${checkOrgLimit('orgTeam/delUser')}`

      return schema
    },
  })

  return (
    <S.StyledTeam className="container">
      <h5 className="m-b-md">我的团队</h5>
      <div className="row">
        <div className="col-lg-4">
          <Section title="团队组织结构">{teamTree}</Section>
        </div>
        <div className="col-lg-8">
          <Section title="团队成员列表" headerClassName="m-b-sm">
            {userList}
          </Section>
        </div>
      </div>
    </S.StyledTeam>
  )
}
