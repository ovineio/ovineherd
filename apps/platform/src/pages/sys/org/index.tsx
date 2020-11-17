import React from 'react'

import { Amis } from '@core/components/amis/schema'

import Tabs from '~/components/tabs'

import orgSchema from './schema'

export default () => {
  return (
    <div className="container">
      <h5 className="m-b-md">组织管理</h5>
      <Tabs>
        <Amis schema={orgSchema} />
      </Tabs>
    </div>
  )
}
