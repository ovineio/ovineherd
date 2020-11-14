import React from 'react'

import { Amis } from '@core/components/amis/schema'

import registerSchema from './schema'
import { StyledRegister } from './styled'
// import * as S from './styled'

export default () => {
  return (
    <StyledRegister>
      <Amis schema={registerSchema} />
    </StyledRegister>
  )
}
