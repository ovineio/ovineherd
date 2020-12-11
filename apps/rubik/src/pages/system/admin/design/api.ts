import { deserialize, serialize } from '@core/utils/tool'

import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

const defaultSchema = {
  type: 'page',
  title: '新页面',
  body: '开始编辑一个新页面吧',
}

const getDesignPageApi = (pageId) => {
  const getPage = getReqOption(
    {
      apiType: relation.app.page.apiType,
      apiName: ApiName.one,
      id: pageId,
    },
    {
      onSuccess: (source) => {
        const { schema } = source.data
        source.data = deserialize(schema) || defaultSchema
        return source
      },
    }
  )

  const savePage = getReqOption(
    {
      apiType: relation.app.page.apiType,
      apiName: ApiName.edit,
      id: pageId,
    },
    {
      onPreRequest: async (option) => {
        const { schema } = option.data
        option.data.schema = serialize(schema)
        return option
      },
    }
  )

  return {
    getPage,
    savePage,
  }
}

export default getDesignPageApi
