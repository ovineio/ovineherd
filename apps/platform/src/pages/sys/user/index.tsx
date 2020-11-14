import React from 'react'

import { Amis } from '@core/components/amis/schema'

import Tabs from '~/components/tabs'

import userSchema from './schema'

// import * as S from './styled'

export default () => {
  return (
    <div className="container">
      <h5 className="m-b-md">平台用户管理</h5>
      <Tabs>
        <Amis schema={userSchema} />
      </Tabs>
    </div>
  )
}
