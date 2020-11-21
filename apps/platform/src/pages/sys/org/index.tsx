import React from 'react'

import Tabs from '~/components/tabs'
import { useSchema } from '~/core/hooks'

import { getSysOrgApis } from './api'
import orgSchema from './schema'

export default () => {
  const schema = useSchema({
    schema: orgSchema,
    getApis: getSysOrgApis,
  })

  return (
    <div className="container">
      <h5 className="m-b-md">组织管理</h5>
      <Tabs>{schema}</Tabs>
    </div>
  )
}
