/**
 * 由于后端接口设计很特殊
 * 因此将页面所有要调的接口，全部封装在这里
 */

import { mapTree } from 'amis/lib/utils/helper'
import { ReqOption } from '@core/utils/request/types'
import { setStore } from '@core/utils/store'
import { get } from 'lodash'

import { relation, storeKey } from '../constants'
import { ApiName, ApiType } from '../types'
import { getAppId, isStrTrue } from '../utils'
import { ApiData, getReqOption, request, requestByOption } from './utils'

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

export function sysUserLogoutApi() {
  //
}

// 获取 平台配置
export function sysConfigApi() {
  // 平台配置由系统 初始化生成
  return requestByOption({
    onlyOne: true,
    apiName: ApiName.list,
    ...relation.sys.sysInfo,
  }).then((sysInfo) => {
    setStore(storeKey.sysInfo, sysInfo)
    return sysInfo
  })
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
        })

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
