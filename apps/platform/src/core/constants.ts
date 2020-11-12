/**
 * 应用内常量模块
 */

// 用于存储的key
export const storeKey = {
  auth: 'authStore',
  userInfo: 'userInfoStore',
}

export const entityType = {
  system: 'ovine_system', // 平台类型
  systemUser: 'ovine_system_user', // 平台用户
  systemUserInfo: 'ovine_system_user_info', // 平台用户

  org: 'ovine_org', // 组织
  orgUser: 'ovine_org_user', // 组织用户
  orgUserInfo: 'ovine_org_user_info', // 组织用户个人信息

  orgTeam: 'ovine_org_team', // 组织团队
  orgLimit: 'ovine_org_limit', // 组织权限

  app: 'ovine_app', // 应用
  appUser: 'ovine_app_user', // 应用用户
  appUserInfo: 'ovine_app_user_info', // 应用用户个人信息

  appLimit: 'ovine_app_limit', //
}

export const relation = {
  org: {
    user: {
      type: entityType.orgUser,
      relation1_type: 'config',
      relation2_type: 'category',
    },
    entity: {
      type: entityType.org,
      relation1_type: 'config', // 关联组织配置
      relation2_type: 'user', // 关联当前管理员
      level: '1',
      parent_id: 'root',
    },
  },
}
