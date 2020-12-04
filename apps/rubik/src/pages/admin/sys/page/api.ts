import { filterTree } from 'amis/lib/utils/helper'
import produce from 'immer'
import { get } from 'lodash'
import { getReqOption, requestByOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getAppId } from '~/core/utils'

const appId = getAppId()

let cacheListNav = []

const listNav = {
  url: 'GET /v1/option/category',
  data: {
    type: relation.app.nav.type,
    parent_id: 0,
    q_relation1: appId,
    '&': '$$',
  },
  onSuccess: (source) => {
    const { option } = source.data
    source.data = get(option, '0') || { items: [] }
    cacheListNav = source.data.items
    return source
  },
}

const navParent = {
  url: 'GET /v1/option/category',
  cache: 1000,
  data: {
    nav_id: '$id',
  },
  onFakeRequest: (option) => {
    const { nav_id } = option.data
    const options = produce(cacheListNav, (d) => {
      d.unshift({
        label: '主目录',
        id: '0',
      })
    })
    return {
      status: 0,
      data: {
        options: !nav_id ? options : filterTree(options, (i) => i.id !== nav_id),
      },
    }
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
