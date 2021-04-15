import React from 'react'

import { useActiveUserTab, useSchema } from '~/core/hooks'
import { checkOrgLimit } from '~/core/user'

import { getOrgSettingApis } from './api'
import { settingSchema } from './schema'
import * as S from './styled'

export default () => {
  const activeKey = useActiveUserTab()

  const pageSchema = useSchema(
    {
      schema: settingSchema,
      getApis: getOrgSettingApis,
      schemaProps: {
        data: {
          editOrg: checkOrgLimit('orgSetting/editOrg'),
          editLogin: checkOrgLimit('orgSetting/editOrg'),
        },
      },
    },
    [activeKey]
  )

  return <S.StyledSetting className="container">{pageSchema}</S.StyledSetting>
}
