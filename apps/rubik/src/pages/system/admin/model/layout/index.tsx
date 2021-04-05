import React from 'react'

import Aside from '../aside'
import Header from '../header'

import { StyledBody, StyledLayout } from './styled'

export default () => {
  return (
    <StyledLayout>
      <Header />
      <StyledBody>
        <Aside />
        <div>123</div>
      </StyledBody>
    </StyledLayout>
  )
}
