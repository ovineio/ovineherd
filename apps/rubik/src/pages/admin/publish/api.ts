import { app } from '@ovine/core/lib/app'
import { get } from 'lodash'
import { getReqOption, requestByOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getAppId } from '~/core/utils'

const appId = getAppId()

const listNav = {
  url: 'GET /v1/option/category',
  data: {
    type: relation.app.nav.type,
    parent_id: 0,
    q_relation1: appId,
  },
  onSuccess: (source) => {
    const { option } = source.data
    source.data = get(option, '0') || { items: [] }
    return source
  },
}

const navParent = {
  url: 'GET /v1/option/category',
  data: {
    type: relation.app.nav.type,
    q_relation1: appId,
    '&': '$$',
  },
  onSuccess: (source) => {
    const { option } = source.data
    const options = get(option, '0.items') || []
    options.unshift({
      label: '主目录',
      id: '0',
    })
    source.data = {
      options,
    }
    return source
  },
}
const addNav = getReqOption(
  {
    ...relation.app.nav,
    apiName: ApiName.add,
    relation1: appId,
    '&': '$$',
  },
  {
    onPreRequest: async (option) => {
      const { parent_id } = option.data
      const { id } = await requestByOption({
        ...relation.app.page,
        apiName: ApiName.add,
      })
      option.data.page_id = id
      option.data.parent_id = parent_id || '0'
      return option
    },
  }
)

const editNav = getReqOption({
  apiType: relation.app.nav.apiType,
  apiName: ApiName.edit,
  '&': '$$',
})

const delNav = getReqOption({
  apiType: relation.app.nav.apiType,
  apiName: ApiName.del,
})

const adminPageApi = {
  navParent,
  listNav,
  addNav,
  editNav,
  delNav,
}

export default adminPageApi
