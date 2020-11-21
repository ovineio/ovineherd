import React from 'react'

import Section from '~/components/section'
import { useSchema } from '~/core/hooks'

import { getOrgTeamApis } from './api'
import { getTableRef, tableSchema, treeSchema } from './schema'
import * as S from './styled'

export default () => {
  const teamTree = useSchema({
    schema: treeSchema,
    getApis: getOrgTeamApis,
  })

  const userList = useSchema({
    schema: tableSchema,
    getApis: getOrgTeamApis,
    schemaProps: {
      onAction: () => {
        //
      },
      scopeRef: getTableRef,
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
