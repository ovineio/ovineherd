import React from 'react'

import { Amis } from '@core/components/amis/schema'

import { settingSchema } from './schema'
import * as S from './styled'

export default () => {
  return (
    <S.StyledSetting className="container">
      <Amis schema={settingSchema} />
    </S.StyledSetting>
  )
}
