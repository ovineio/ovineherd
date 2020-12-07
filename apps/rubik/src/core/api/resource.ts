/**
 * 由于后端接口设计很特殊
 * 因此将页面所有要调的接口，全部封装在这里
 */

import { get } from 'lodash'

import { ReqOption } from '@core/utils/request/types'
import { setStore } from '@core/utils/store'

import { relation, storeKey } from '../constants'
import { ApiName, ApiType } from '../types'
import { getAppId, isStrTrue } from '../utils'
import { userAdmRoutes } from '../routes'

import { ApiData, getReqOption, request, requestByOption } from './utils'
import { isAppIsolation } from '../common'

// 根据 token 获取用户信息
export function userSelfInfoApi(data: ApiData, option?: ReqOption) {
  return requestByOption(
    {
      apiType: ApiType.user,
      apiName: ApiName.one,
      ...data,
    },
    option
  )
}

export function userSelfInfoReqOpt(data: ApiData, option?: ReqOption) {
  const reqOption = getReqOption(
    {
      apiType: ApiType.user,
      apiName: ApiName.one,
      ...data,
    },
    option
  )

  return reqOption
}

// 系统用户登录
export function sysUserLoginApi(option: ApiData) {
  return requestByOption(
    {
      apiType: ApiType.user,
      apiName: ApiName.login,
      onlyData: false,
      ...option,
    },
    {
      // 不提示错误信息
      onSuccess: (source) => {
        source.code = source.status
        source.status = 0
        return source
      },
    }
  )
}

// 获取 组织配置
export function orgConfigApi(option: { orgId: string }) {
  return requestByOption({
    ...relation.org.entity,
    apiName: ApiName.one,
    id: option.orgId,
  }).then((source) => {
    const orgInfo = source.relation1_data
    setStore(storeKey.orgInfo, orgInfo)
    return orgInfo
  })
}

// 初始化 APP 信息
/**
 * 1. 如果APP是 独立应用，则使用独立数据
 * 2. 非独应用，使用 组织信息/平台信息
 * ----
 * 1. 独立医应用，需要渲染额外的  用户列表/角色列表
 */

function fetchOrgInfo(orgInfoId: string) {
  return requestByOption({
    ...relation.org.entity,
    apiName: ApiName.one,
    id: orgInfoId,
    onlyData: true,
  }).then((source) => {
    setStore(storeKey.orgInfo, source)
    return source
  })
}

export function fetchAppInfo(appId: string = getAppId()) {
  return requestByOption({
    ...relation.app.entity,
    apiName: ApiName.one,
    id: appId,
    onlyData: true,
  }).then((source) => {
    const { relation1_data: appInfo, relation2_data: org = {} } = source
    const { id: orgId } = org

    setStore(storeKey.appInfo, appInfo)
    if (orgId) {
      return fetchOrgInfo(orgId).then((orgSource) => {
        return { appInfo, orgInfo: orgSource.relation1_data }
      })
    }

    return { appInfo, orgInfo: {} }
  })
}

// 获取导航
export function getAppRouteItems() {
  return request('other.catOpts', {
    type: relation.app.nav.type,
    parent_id: 0,
    q_relation1: getAppId(),
  }).then((source) => {
    return get(source, 'option.0.items') || []
  })
}
