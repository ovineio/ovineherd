import React from 'react'
import styled from 'styled-components'

const StyledWrap = styled.div`
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .cxd-Table {
    border: 0;
  }
`

type Props = {
  children: any
  title: string
  // eslint-disable-next-line
  headerClassName?: string
}
export default (props: Props) => {
  const { children, title, headerClassName = '' } = props
  return (
    <StyledWrap className="section-wrap p-t-md">
      <h6 className={`cxd-section-header ${headerClassName}`}>{title}</h6>
      {children}
    </StyledWrap>
  )
}
