/**
 * 应用内请求模块
 * ---
 * 以下 ovine demo api 一种实现方式，具体请根据项目进行修改
 * 请求模块: https://ovine.igroupes.com/org/docs/modules/request
 */

import logger from '@core/utils/logger'
import { Request } from '@core/utils/request'
import { getStore } from '@core/utils/store'

import { getApiQuery } from './api/utils'
import { storeKey } from './constants'

// 日志模块 https://ovine.igroupes.com/org/docs/modules/logger
const log = logger.getLogger('app:request')

const appRequestIns = new Request()

// 请求准备阶段 回调
appRequestIns.onPreRequest = (option) => {
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

  // demo api 携带用户鉴权信息，具体鉴权需自行实现
  if (key) {
    option.headers[key] = token
  }

  return option
}

// 接收到请求正常结果 回调
appRequestIns.onSuccess = (source) => {
  // const { code = 0, msg, message } = source
  // const { api } = option

  // // 退出接口，不处理
  // if (api !== apis.selfLogout.url) {
  //   // token 异常 code 处理
  //   if (code === 10023 || code === 10022) {
  //     logout({
  //       tip: '当前用户登录过期，请重新登录',
  //     })
  //   }
  // }

  return source
}

// 请求发送错误错误 回调
appRequestIns.onError = (response, option, error) => {
  log.warn('请求发送出现错误', { response, option }, error)
}

export default appRequestIns
