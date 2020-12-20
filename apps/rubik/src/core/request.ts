/**
 * 应用内请求模块
 * ---
 * 以下 ovine demo api 一种实现方式，具体请根据项目进行修改
 * 请求模块: https://ovine.igroupes.com/org/docs/modules/request
 */

// import logger from '@core/utils/logger'
import { Request } from '@core/utils/request'
import { getStore } from '@core/utils/store'
import { app } from '@ovine/core/lib/app'
// import { app } from '@ovine/core/lib/app'
import { str2function } from '@ovine/core/lib/utils/tool'

import { getApiQuery } from './api/utils'
import { getAppInfo } from './common'
import { storeKey } from './constants'

// 日志模块 https://ovine.igroupes.com/org/docs/modules/logger
// const log = logger.getLogger('app:request')

const appRequestIns = new Request()

const onExtraReqHook = (type: string, props: any): any => {
  const { option, source, response, error } = props

  // 内部API不处理
  if (!option || option.domain === 'api') {
    return false
  }

  const {
    request_base_url,
    request_data_type,
    request_pre_request,
    request_success,
    request_error,
  } = getAppInfo()

  switch (type) {
    case 'onPreRequest':
      if (!option.dataType && request_data_type) {
        option.dataType = request_data_type
      }
      if (!app.env.domains.baseUrl && request_base_url) {
        app.env.domains.baseUrl = request_base_url
      }
      if (!option.domain) {
        option.domain = app.env.domains.baseUrl ? 'baseUrl' : 'api'
      }
      if (request_pre_request) {
        const onPreRequest = str2function('onPreRequest', request_pre_request, 'option')
        return onPreRequest(option)
      }
      break

    case 'onSuccess':
      if (request_success) {
        const onSuccess = str2function('onSuccess', request_success, 'source', 'option', 'response')
        return onSuccess(source, option, response)
      }
      break

    case 'onError':
      if (request_error) {
        const onError = str2function('onError', request_error, 'response', 'option', 'error')
        return onError(response, option, error)
      }
      break

    default:
      return false
  }

  return false
}

// 请求准备阶段 回调
appRequestIns.onPreRequest = (option) => {
  const extraEeqRes = onExtraReqHook('onPreRequest', { option })
  if (extraEeqRes) {
    return extraEeqRes
  }

  option.mock = false // 全局控制是否开启 mock， 必须在 ovine cli --mock 选项开启的情况下，才有效
  const { method, data = {} } = option

  Object.keys(data).forEach((key) => {
    if (/relation._data/.test(key)) {
      delete option.data[key]
    }
  })

  if (method === 'GET') {
    // 添加 GET 请求参数逻辑
    option.data = getApiQuery(data)
  }

  return option
}

// 请求发送前 回调
appRequestIns.onRequest = (option) => {
  const { key, token } = getStore(storeKey.auth) || {}
  // 开启携带 cookies 信息
  option.fetchOptions.credentials = 'include'

  if (key) {
    option.headers[key] = token
  }

  return option
}

// 接收到请求正常结果 回调
appRequestIns.onSuccess = (source, option, response) => {
  const extraEeqRes = onExtraReqHook('onSuccess', { source, option, response })
  if (extraEeqRes) {
    return extraEeqRes
  }

  return source
}

// 请求发送错误错误 回调
appRequestIns.onError = (response, option, error) => {
  onExtraReqHook('onError', { error, option, response })

  // log.warn('请求发送出现错误', { response, option }, error)
}

export default appRequestIns
