import React from 'react'

import Routes from '~/routes'

import Header from './header'

import * as S from './styled'

export default (props) => {
  const { children } = props

  return (
    <S.Layout>
      <Header />
      <S.Body className="py-4">
        <div className="container">
          <Routes />
          {children}
        </div>
      </S.Body>
    </S.Layout>
  )
}
