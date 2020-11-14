import { omit } from 'lodash'

import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

// 平台管理员 查询 平台用户 列表
export function sysListUserReqOpt() {
  const reqOption = getReqOption({
    ...relation.sys.user,
    apiName: ApiName.list,
    '&': '$$',
  })

  return reqOption
}

// 平台管理员 添加 平台用户
export function sysAddUserReqOpt() {
  const reqOption = getReqOption({
    ...relation.sys.user,
    apiName: ApiName.add,
    '&': '$$',
  })

  return reqOption
}

// 平台管理员 编辑 平台用户
export function sysEditUserReqOpt() {
  const reqOption = getReqOption(
    {
      ...relation.sys.user,
      apiName: ApiName.edit,
      '&': '$$',
    },
    {
      onPreRequest: (option) => {
        option.data = omit(option.data, ['username'])
        return option
      },
    }
  )

  return reqOption
}

// 平台管理员 删除 平台用户
export function sysDelUserReqOpt() {
  const reqOption = getReqOption({
    ...relation.sys.user,
    apiName: ApiName.del,
  })

  return reqOption
}

export const sysUserApis = {
  listUser: sysListUserReqOpt(),
  addUser: sysAddUserReqOpt(),
  editUser: sysEditUserReqOpt(),
  delUser: sysDelUserReqOpt(),
}
