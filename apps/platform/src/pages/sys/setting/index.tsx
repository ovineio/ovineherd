import { uuid } from 'amis/lib/utils/helper'
import React from 'react'

import { Amis } from '@core/components/amis/schema'
import { useImmer, useSubscriber } from '@ovine/core/lib/utils/hooks'

import { msgKey } from '~/core/constants'

import settingSchema from './schema'
import * as S from './styled'

export default () => {
  const [state, setState] = useImmer({
    refreshKey: '',
  })

  useSubscriber(msgKey.activeUserInfoTab, () => {
    setState((d) => {
      d.refreshKey = uuid()
    })
  })

  return (
    <S.StyledSetting className="container">
      <Amis key={state.refreshKey} schema={settingSchema} />
    </S.StyledSetting>
  )
}
