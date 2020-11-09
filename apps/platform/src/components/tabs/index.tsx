import React from 'react'
import styled from 'styled-components'

const StyledWrap = styled.div`
  padding: 10px 0 0;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .cxd-Table {
    border: 0;
  }

  .cxd-Tabs-pane {
    padding: 0;
  }
  .cxd-Tabs-links {
    padding-left: 20px;
  }
  .cxd-Tabs-content {
    padding-bottom: 0;
  }
`

type Props = {
  children: any
}
export default (props: Props) => {
  const { children } = props
  return <StyledWrap className="tabs-wrap">{children}</StyledWrap>
}
