import React from 'react'

import { Amis } from '@core/components/amis/schema'

import Section from '~/components/section'

import { tableSchema, treeSchema } from './schema'
import * as S from './styled'

export default () => {
  return (
    <S.StyledTeam className="container">
      <h5 className="m-b-md">我的团队</h5>
      <div className="row">
        <div className="col-lg-3">
          <Section title="团队组织结构">
            <Amis schema={treeSchema} />
          </Section>
        </div>
        <div className="col-lg-9">
          <Section title="团队成员列表" headerClassName="m-b-sm">
            <Amis schema={tableSchema} />
          </Section>
        </div>
      </div>
    </S.StyledTeam>
  )
}
