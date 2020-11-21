import React from 'react'

import { Amis } from '@core/components/amis/schema'

import Tabs from '~/components/tabs'

import { orgRoleSchema } from './schema'
import * as S from './styled'

export default () => {
  return (
    <S.StyledRole className="container">
      <h5 className="m-b-md">角色管理</h5>
      <Tabs>
        <Amis schema={orgRoleSchema} />
      </Tabs>
    </S.StyledRole>
  )
}
