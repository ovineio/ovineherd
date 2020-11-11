/**
 * 定义需要的 api
 */

import { get, map, omitBy } from 'lodash'
import { stringify } from 'qs'

import { app } from '@core/app'
import { ReqOption } from '@core/utils/request/types'

export const apis = {
  user: {
    login: {
      url: 'POST /v1/user/login',
    },
    list: {
      url: 'GET /v1/user',
    },
    one: {
      url: 'GET /v1/user/$id',
    },
    add: {
      url: 'POST /v1/user/login',
    },
    edit: {
      url: 'PUT /v1/user/$id',
    },
    del: {
      url: 'DELETE /v1/user/$id',
    },
  },
  config: {
    list: {
      url: 'GET /v1/config',
    },
    one: {
      url: 'GET /v1/config/$id',
    },
    add: {
      url: 'POST /v1/config/login',
    },
    edit: {
      url: 'PUT /v1/config/$id',
    },
    del: {
      url: 'DELETE /v1/config/$id',
    },
  },
  file: {
    upload: {
      url: 'POST /v1/file',
    },
  },
  category: {
    // 配置
    list: {
      url: 'GET /v1/category',
    },
    one: {
      url: 'GET /v1/category/$id',
    },
    add: {
      url: 'POST /v1/category/login',
    },
    edit: {
      url: 'PUT /v1/category/$id',
    },
    del: {
      url: 'DELETE /v1/category/$id',
    },
  },
  product: {
    list: {
      url: 'GET /v1/product',
    },
    one: {
      url: 'GET /v1/product/$id',
    },
    add: {
      url: 'POST /v1/product/login',
    },
    edit: {
      url: 'PUT /v1/product/$id',
    },
    del: {
      url: 'DELETE /v1/product/$id',
    },
  },
}

type QueryOption = { [key: string]: string | number }

export const getApiConditionStr = (conditions: QueryOption): string => {
  if (!conditions) {
    return ''
  }

  let str = ''

  map(conditions, (val, key) => {
    if (typeof val !== 'undefined' || val !== '') {
      str += `${key}:${val},`
    }
  })

  return str.slice(0, -1)
}

// 获取请求参数
export const getApiQuery = (option: any) => {
  const queryParams = {
    ...option,
    query: getApiConditionStr(option.query),
    names: getApiConditionStr(option.names),
  }

  return omitBy(queryParams, (val) => val === '' || typeof val === 'undefined')
}

export const getApiQueryStr = (option: any) => {
  const queryStr = stringify(getApiQuery(option))

  return queryStr
}

export const getOneItem = (source: any) => {
  return get(source, 'data.items.0') || {}
}

// data:  onlyOne 获取 items 单独的一个
export const request = (apiKey: string, data: any = {}, option?: ReqOption) => {
  const apiInfo = get(apis, apiKey)
  const { onlyOne, onlyData = true, withHttp = false, ...params } = data

  const reqOption = {
    data: getApiQuery(params),
    domain: 'api',
    ...apiInfo,
    ...option,
  }

  // 简化数据读取逻辑
  const req = app.request(reqOption).then((source) => {
    if (withHttp) {
      return source
    }

    if (onlyOne) {
      const apiData = source.data
      apiData.data = getOneItem(apiData)

      return onlyData ? apiData.data : apiData
    }

    if (onlyData) {
      return source.data.data
    }

    return source.data
  })

  return req
}
