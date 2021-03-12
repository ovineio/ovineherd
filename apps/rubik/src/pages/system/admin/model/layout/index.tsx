import React from 'react'

import Header from '../header'
import Aside from '../aside'

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
