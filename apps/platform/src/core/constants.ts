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
  orgRole: 'ovine_org_role', // 组织权限
  orgLimit: 'ovine_org_limit',

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
      path: '0',
      level: '0',
      parent_id: '0',
    },
    orgInfo: {
      apiType: ApiType.config, // 该 type 需要拼接 orgId
      type: entityType.org,
    },
    user: {
      apiType: ApiType.user,
      type: entityType.orgUser,
      relation1_type: ApiType.config, // 组织管理员 配置信息
      relation2_type: ApiType.category, // 组织管理员 关联的组织
      relation3_type: ApiType.category, // 组织管理员 关联的部门ID
      relation4_type: ApiType.category, // 组织管理员 关联的角色ID
    },
    team: {
      apiType: ApiType.category,
      type: entityType.orgTeam,
      relation1_type: ApiType.category, // 关联到组织
      // 默认值
      path: '0',
      level: '0',
      parent_id: '0',
    },
    role: {
      apiType: ApiType.category,
      type: entityType.orgRole,
      relation1_type: ApiType.category, // 关联到组织
      relation2_type: ApiType.authorization, // 关联到权限
      // 默认值
      path: '0',
      level: '0',
      parent_id: '0',
    },
    limit: {
      apiType: ApiType.authorization,
      type: entityType.orgLimit,
      resource: 'org',
      entity: 'org',
      operation: 'all',
      relation1_type: ApiType.category, // 权限 关联的角色
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

export const emptyListHolder = `
  <div class="text-center padder-v-lg" >
  <p class="m-b-none">
    <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg style="width:80px;height:80px;" t="1605449509772" class="icon" viewBox="0 0 1167 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14746" xmlns:xlink="http://www.w3.org/1999/xlink" width="227.9296875" height="200"><defs><style type="text/css"></style></defs><path d="M0 933.084112a583.775701 90.915888 0 1 0 1167.551402 0 583.775701 90.915888 0 1 0-1167.551402 0Z" fill="#F7F7F8" p-id="14747"></path><path d="M115.798131 602.915888l155.035514-195.229907V765.607477L115.798131 901.502804V602.915888zM1050.796262 593.345794l-172.261683-210.542056v417.256075l172.261683 101.442991V593.345794z" fill="#AEB8C2" p-id="14748"></path><path d="M258.392523 0m38.280374 0l583.775701 0q38.280374 0 38.280374 38.280374l0 736.897196q0 38.280374-38.280374 38.280374l-583.775701 0q-38.280374 0-38.280374-38.280374l0-736.897196q0-38.280374 38.280374-38.280374Z" fill="#F5F5F7" p-id="14749"></path><path d="M344.523364 86.130841m9.570094 0l459.364486 0q9.570093 0 9.570093 9.570094l0 220.112149q0 9.570093-9.570093 9.570094l-459.364486 0q-9.570093 0-9.570094-9.570094l0-220.112149q0-9.570093 9.570094-9.570094Z" fill="#DCE0E6" p-id="14750"></path><path d="M373.233645 430.654206h430.654205a19.140187 19.140187 0 0 1 19.140187 19.140187 19.140187 19.140187 0 0 1-19.140187 19.140186H373.233645a19.140187 19.140187 0 0 1-19.140187-19.140186 19.140187 19.140187 0 0 1 19.140187-19.140187zM373.233645 535.925234h430.654205a19.140187 19.140187 0 0 1 19.140187 19.140187 19.140187 19.140187 0 0 1-19.140187 19.140186H373.233645a19.140187 19.140187 0 0 1-19.140187-19.140186 19.140187 19.140187 0 0 1 19.140187-19.140187zM114.841121 602.915888h236.381309c43.065421 0 38.280374 80.388785 62.205607 86.130841s229.682243 5.742056 365.57757 0c18.183178-13.398131 8.613084-86.130841 45.936449-86.130841H1052.71028v296.672897a57.420561 57.420561 0 0 1-57.42056 57.420561H172.261682a57.420561 57.420561 0 0 1-57.420561-57.420561z" fill="#DCE0E6" p-id="14751"></path></svg>
  </p>
  <span class="text-muted">暂无数据</span>
  </div>
`
