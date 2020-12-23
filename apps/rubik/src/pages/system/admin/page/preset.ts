import { filterTree } from 'amis/lib/utils/helper'
import {
  cloneDeep,
  find,
  findIndex,
  get,
  isArray,
  isString,
  map,
  pick,
  remove,
  uniqueId,
} from 'lodash'

import { getReqOption, requestByOption } from '~/core/api/utils'
import { getAppInfo, getHomePageId, setHomePageId } from '~/core/common'
import { relation } from '~/core/constants'
import { ApiName, ApiType } from '~/core/types'
import { getAppId } from '~/core/utils'

const defLimitInfo = {
  $page: {
    label: '访问页面',
  },
  edit: {
    label: '编辑',
    desc: '默认权限--编辑',
  },
  add: {
    label: '添加',
    desc: '默认权限--添加',
  },
  del: {
    label: '删除',
    needs: ['add', 'edit'],
    desc: '默认权限--删除',
  },
}

const limitStore = {
  id: '',
  list: [],
}

const getAppPageApis = () => {
  let cacheListNav = []

  const appId = getAppId()

  const listNav = {
    url: 'GET /v1/option/category',
    domain: 'api',
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
    url: 'fakeNavParent',
    domain: 'api',
    // cache: 500,
    data: {
      nav_id: '$id',
    },
    onFakeRequest: (option) => {
      const { nav_id } = option.data
      let appNav = cacheListNav
      if (option.api !== 'fakeNavParent') {
        appNav = cloneDeep(cacheListNav)
        appNav.unshift({
          label: '主目录',
          id: '0',
        })
      }

      const options = !nav_id ? appNav : filterTree(appNav, (i) => i.id !== nav_id)
      const source = {
        status: 0,
        data: {
          options,
        },
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
        const { parent_id, page_type } = option.data
        const { id } = await requestByOption({
          ...relation.app.page,
          apiName: ApiName.add,
        })
        option.data.page_id = id
        option.data.parent_id = parent_id || '0'

        if (page_type === '1') {
          option.data.limit_str = JSON.stringify(defLimitInfo)
        }

        return option
      },
    }
  )

  const getHome = {
    url: 'fakeGetHome',
    onFakeRequest: () => {
      return {
        data: {
          page_id: getHomePageId(),
        },
      }
    },
  }

  const setHome = getReqOption(
    {
      apiType: relation.app.appInfo.apiType,
      apiName: ApiName.edit,
      id: getAppInfo().id,
      app_home_page_id: '$page_id',
    },
    {
      onSuccess: (source, option) => {
        const { app_home_page_id = '' } = option.data
        setHomePageId(app_home_page_id)
        return source
      },
    }
  )

  const editNav = getReqOption({
    apiType: relation.app.nav.apiType,
    apiName: ApiName.edit,
  })

  const delNav = getReqOption({
    apiType: relation.app.nav.apiType,
    apiName: ApiName.del,
    with_root: true,
    '&': '$$',
  })

  const orderNav = {
    url: 'PUT fakeListLimit',
    onFakeRequest: () => {
      return {
        status: 0,
        msg: '成功',
      }
    },
  }

  const checkLimitData = (data: any): any => {
    if (!data.key || !data.label) {
      return {
        status: -1,
        msg: '请填写KEY与名称',
      }
    }
    if (!data.id) {
      if (limitStore.list.find((i) => i.key === data.key)) {
        return {
          status: -1,
          msg: '权限 KEY 不能重复',
        }
      }
    }

    return ''
  }

  const limitCtrl = async (type: string): Promise<any> => {
    const reqOpt = {
      id: limitStore.id,
      apiType: ApiType.category,
    }
    const getLimitStr = () => {
      const limit = pick(defLimitInfo, ['$page'])
      limitStore.list.forEach((i) => {
        const { label, needs, desc } = i
        const item: any = { label, desc }
        if (isArray(needs)) {
          item.needs = needs
            .map(({ value: id }) => {
              const { key } = find(limitStore.list, { id }) || {}
              return key
            })
            .filter(isString)
        }
        limit[i.key] = item
      })
      return JSON.stringify(limit)
    }

    switch (type) {
      case 'get': {
        const { limit_str } = await requestByOption({
          ...reqOpt,
          apiName: ApiName.one,
          onlyData: true,
        })
        return limit_str
      }
      case 'save': {
        const saveRes = await requestByOption({
          ...reqOpt,
          apiName: ApiName.edit,
          limit_str: getLimitStr(),
        })
        return saveRes
      }

      default:
        return ''
    }
  }

  const listLimit = {
    url: 'fakeListLimit',
    onFakeRequest: async (option) => {
      const { id } = option.rawData
      limitStore.id = id
      limitStore.list = []
      const limitStr = await limitCtrl('get')
      if (limitStr) {
        const limitObj = JSON.parse(limitStr)
        map(limitObj, (val, key) => {
          if (key !== '$page') {
            limitStore.list.push({
              id: uniqueId(),
              key,
              ...val,
            })
          }
        })
        limitStore.list.forEach((i) => {
          const { needs = [] } = i
          i.needs = !isArray(needs)
            ? []
            : needs.map((n) => {
                const { label, id: limitId } = find(limitStore.list, { key: n }) || {}
                return { label, value: limitId }
              })
        })
      }
      return {
        data: {
          limitList: limitStore.list,
        },
      }
    },
  }

  const editLimit = {
    url: 'PUT fakeEditLimit',
    onFakeRequest: async (option) => {
      const { id } = option.data
      const checkRes = checkLimitData(option.data)
      if (checkRes) {
        return checkRes
      }
      const idx = findIndex(limitStore.list, { id })
      if (idx !== -1) {
        limitStore.list[idx] = option.data
      }
      await limitCtrl('save')
      return {
        data: find(limitStore.list, { id }),
      }
    },
  }

  const delLimit = {
    url: 'PUT fakeDelLimit',
    onFakeRequest: async (option) => {
      const { id } = option.data
      remove(limitStore.list, { id })
      await limitCtrl('save')
      return {
        status: 0,
        msg: '已删除',
      }
    },
  }

  const addLimit = {
    url: 'POST fakeAddLimit',
    onFakeRequest: async (option) => {
      const checkRes = checkLimitData(option.data)
      if (checkRes) {
        return checkRes
      }
      limitStore.list.push(option.data)
      await limitCtrl('save')
      return {
        status: 0,
        msg: '保存成功',
      }
    },
  }

  const needsOptions = {
    url: 'GET fakeNeedsList',
    data: {
      id: '$id',
    },
    onFakeRequest: (option) => {
      const { id } = option.data

      const checkNeeded = (checkId: string, needs: any[]) => {
        let isNeeded = false

        const check = (currNeeds: any[]) => {
          if (!currNeeds || !currNeeds.length) {
            return
          }
          if (find(currNeeds, { value: checkId })) {
            isNeeded = true
            return
          }
          currNeeds.forEach((i) => {
            const itemNeeds = get(find(limitStore.list, { id: i.value }), 'needs') || []
            check(itemNeeds)
          })
        }

        check(needs)

        return isNeeded
      }

      const options = limitStore.list
        .filter((i) => {
          if (i.id === id) {
            return false
          }
          return !checkNeeded(id, i.needs)
        })
        .map((i) => {
          return {
            label: i.label,
            value: i.id,
          }
        })

      return {
        data: {
          options,
        },
      }
    },
  }

  const onOrderChange = {
    onChange: (curr, prev) => {
      if (curr.length && curr.length === prev.length) {
        if (curr.map((i) => i.id).join(',') !== prev.map((i) => i.id).join(',')) {
          limitStore.list = curr
          limitCtrl('save')
        }
      }
    },
  }

  const appPageApis = {
    navParent,
    listNav,
    orderNav,
    getHome,
    setHome,
    addNav,
    editNav,
    delNav,
    listLimit,
    editLimit,
    delLimit,
    addLimit,
    onOrderChange,
    needsOptions,
  }

  return appPageApis
}

const getPreset = () => ({
  apis: getAppPageApis(),
  limits: {
    $page: {
      label: '访问页面',
    },
    edit: {
      label: '编辑',
    },
    design: {
      label: '设计页面',
    },
    limit: {
      label: '页面权限',
    },
    add: {
      label: '添加',
      needs: ['edit'],
    },
    del: {
      label: '删除',
      needs: ['edit'],
    },
  },
})

export default getPreset
