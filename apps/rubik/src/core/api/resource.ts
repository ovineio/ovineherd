/**
 * 由于后端接口设计很特殊
 * 因此将页面所有要调的接口，全部封装在这里
 */

import { get } from 'lodash'

import { mapTree } from 'amis/lib/utils/helper'
import { ReqOption } from '@core/utils/request/types'
import { setStore } from '@core/utils/store'
import { publish } from '@core/utils/message'

import { msgKey, relation, storeKey } from '../constants'
import { ApiName, ApiType } from '../types'
import { getAppId, isStrTrue } from '../utils'
import { ApiData, getReqOption, request, requestByOption } from './utils'
import { userAdmRoutes } from '../routes'

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

function fetchAppInfo(appId: string = getAppId()) {
  return requestByOption({
    ...relation.app.entity,
    apiName: ApiName.one,
    id: appId,
    onlyData: true,
  }).then((source) => {
    const { relation1_data: appInfo, relation2_data: orgInfo = {} } = source
    const { relation1: orgInfoId } = orgInfo

    setStore(storeKey.appInfo, appInfo)
    if (!appInfo.isolation && orgInfoId) {
      return fetchOrgInfo(orgInfoId).then((orgInfoSource) => {
        return { appInfo, orgInfo: orgInfoSource }
      })
    }

    return { appInfo, orgInfo: {} }
  })
}

export function initAppInfoApi() {
  fetchAppInfo().then((source) => {
    const { appInfo, orgInfo } = source
    // 合并 组织与应用的设置信息
    const info = appInfo.isolation
      ? {
          ...orgInfo,
          ...appInfo,
        }
      : orgInfo
    setStore(storeKey.siteCustom, info)
    publish(msgKey.updateAppCustom)
  })
}

// 获取导航
export function getAppNav() {
  return request(
    'other.catOpts',
    {
      type: relation.app.nav.type,
      parent_id: 0,
      q_relation1: getAppId(),
    },
    {
      onSuccess: (source) => {
        const { option } = source.data
        const items = get(option, '0.items') || []

        const routes = mapTree(items, (item: any) => {
          const { label, icon, children, page_type, page_id, side_visible } = item
          const withChildren = !!children?.length
          const routeItem: any = {
            nodePath: parseInt(page_id, 10).toString(36),
            label,
            icon,
            sideVisible: isStrTrue(side_visible),
            children: withChildren ? children : undefined,
          }
          // 普通页面
          if (page_type === '1') {
            // 父节点页面
            if (withChildren) {
              routeItem.exact = true
            }
            // 页面接口
            routeItem.pathToComponent = `api://v1/product/${page_id}`
          }
          return routeItem
        }).concat(userAdmRoutes)

        source.data = [
          {
            nodePath: '/',
            label: '',
            limitLabel: '侧边栏目录',
            children: routes,
          },
        ]

        return source
      },
    }
  )
}
