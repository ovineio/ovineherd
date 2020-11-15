import React from 'react'

import { Amis } from '@core/components/amis/schema'

import { useAppContext } from '~/components/app/context'

import registerSchema from './schema'
import { StyledRegister } from './styled'

const imgSrc = 'https://static.igroupes.com/ovine_bg_cxd.jpeg'

export default () => {
  const { custom } = useAppContext()

  return (
    <StyledRegister>
      <img src={custom.login_bg_img || imgSrc} alt="back-img" className="img-bk" />
      <Amis schema={registerSchema} />
    </StyledRegister>
  )
}
