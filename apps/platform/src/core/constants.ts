/**
 * 应用内常量模块
 */

import { ApiType } from './types'

// 用于存储的key
export const storeKey = {
  auth: 'authStore',
  userInfo: 'userInfoStore',
  siteCustom: 'siteCustomStore',
  sysInfo: 'sysInfoStore',
  orgInfo: 'orgInfoStore',
}

// 用于消息通知的key
export const msgKey = {
  updateSelfInfo: 'updateSelfInfoMsg',
  activeUserInfoTab: 'activeUserInfoTabMsg',
  updateOrgAppList: 'updateOrgAppListMsg',
}

export const entityType = {
  system: 'ovine_system', // 平台类型
  systemUser: 'ovine_system_user', // 平台用户
  systemOrgApply: 'ovine_system_org_apply', // 平台审核 组织申请

  org: 'ovine_org', // 组织
  orgUser: 'ovine_org_user', // 组织用户

  orgTeam: 'ovine_org_team', // 组织团队
  orgLimit: 'ovine_org_limit', // 组织权限

  app: 'ovine_app', // 应用
  appUser: 'ovine_app_user', // 应用用户

  appLimit: 'ovine_app_limit', //
  appTeam: 'ovine_app_team', // 组织团队
}

export const relation = {
  sys: {
    // 该实体唯一，不需要单独创建
    entity: {
      apiType: ApiType.category,
      type: entityType.system,
      relation1_type: 'config', // 平台配置 信息
    },
    sysInfo: {
      apiType: ApiType.config,
      type: entityType.system,
    },
    user: {
      apiType: ApiType.user,
      type: entityType.systemUser,
      relation1_type: 'config', // 用户信息
    },
    // userInfo: {
    //   apiType: ApiType.config,
    //   type: entityType.systemUser,
    //   relation1_type: 'user',
    // },
    // 注册申请
    orgRegisterApply: {
      apiType: ApiType.product,
      type: entityType.systemOrgApply,
      relation1_type: ApiType.user, // 关联 审核人
    },
  },
  org: {
    entity: {
      apiType: ApiType.category,
      type: entityType.org,
      relation1_type: ApiType.config, // 关联组织配置
      relation2_type: ApiType.user, // 关联当前组织管理员
      // org 实体只有一级 关系，暂时写死
      path: '1',
      level: '1',
      parent_id: '1',
    },
    orgInfo: {
      apiType: ApiType.config, // 该 type 需要拼接 orgId
      type: entityType.org,
    },
    user: {
      apiType: ApiType.user,
      type: entityType.orgUser,
      relation1_type: 'config', // 组织管理员配置 信息
      relation2_type: 'category', // 组织管理员配置 关联的组织
    },
    // userInfo: {
    //   apiType: ApiType.config,
    //   type: entityType.orgUser,
    //   relation1_type: 'user', // 组织管理员 信息
    // },
  },
  app: {
    entity: {
      apiType: ApiType.product,
      type: entityType.app,
      relation1_type: ApiType.config, // 关联 配置信息
      relation2_type: ApiType.category, // 关联 组织信息
      relation3_type: ApiType.user, // 关联管理员---独立应用才需要
    },
    appInfo: {
      apiType: ApiType.config,
      type: entityType.app,
    },
    user: {
      apiType: ApiType.user,
      type: entityType.orgUser, // 该 type 需要拼接 appId
      relation1_type: ApiType.config, // 应用管理员配置 信息
      relation2_type: ApiType.product, // 应用管理员配置 关联的 应用
    },
  },
}
