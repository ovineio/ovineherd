import React from 'react'

import { useActiveUserTab, useSchema } from '~/core/hooks'

import { getSysSettingApis } from './api'
import { settingSchema } from './schema'
import * as S from './styled'

export default () => {
  const activeKey = useActiveUserTab()

  const schema = useSchema(
    {
      schema: settingSchema,
      getApis: getSysSettingApis,
    },
    [activeKey]
  )

  return <S.StyledSetting className="container">{schema}</S.StyledSetting>
}
