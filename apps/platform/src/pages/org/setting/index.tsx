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
      filterSchema: (schema) => {
        const editOrg = `${checkOrgLimit('orgSetting/editOrg')}`
        const editLogin = `${checkOrgLimit('orgSetting/editLogin')}`

        schema.body.tabs[1].visibleOn = editOrg
        schema.body.tabs[2].visibleOn = editLogin
        return schema
      },
    },
    [activeKey]
  )

  return <S.StyledSetting className="container">{pageSchema}</S.StyledSetting>
}
