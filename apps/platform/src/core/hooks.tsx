//

import { uuid } from 'amis/lib/utils/helper'
import { set } from 'lodash'
import React, { DependencyList, useMemo, useState } from 'react'

import { Amis } from '@core/components/amis/schema'
import { useSubscriber } from '@core/utils/hooks'
import { AnyFunc } from '@core/utils/types'

import { msgKey } from './constants'

type UseSchemaOption = {
  schema?: any
  apis?: any
  getSchema?: AnyFunc
  getApis?: AnyFunc
  schemaProps?: any
}
export function useSchema(option: UseSchemaOption, deps: DependencyList = []) {
  const { schemaProps, schema: optSchema, apis: optApis, getSchema, getApis } = option

  const schemaComponent = useMemo(() => {
    const schema = getSchema ? getSchema() : optSchema
    const apis = getApis ? getApis() : optApis
    set(schema, 'preset.apis', apis || {})

    return <Amis key={uuid()} schema={schema} props={schemaProps} />
  }, deps)

  return schemaComponent
}

export function useActiveUserTab() {
  const [userRefreshKey, setKey] = useState('')

  useSubscriber(msgKey.activeUserInfoTab, () => {
    setKey(uuid())
  })

  return userRefreshKey
}
