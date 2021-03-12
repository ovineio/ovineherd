import React from 'react'
import { Button } from 'amis'

import { StyledHeader } from './styled'

export default () => {
  return (
    <StyledHeader>
      <Button>添加模型</Button>
      <Button>查看模型关系</Button>
    </StyledHeader>
  )
}
