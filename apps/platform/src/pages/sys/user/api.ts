import { omit } from 'lodash'

import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

// 平台管理员 查询 平台用户 列表
const sysListUserReqOpt = getReqOption({
  ...relation.sys.user,
  apiName: ApiName.list,
  '&': '$$',
})

// 平台管理员 添加 平台用户
const sysAddUserReqOpt = getReqOption({
  ...relation.sys.user,
  apiName: ApiName.add,
  '&': '$$',
})

// 平台管理员 编辑 平台用户
const sysEditUserReqOpt = getReqOption(
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

// 平台管理员 删除 平台用户
const sysDelUserReqOpt = getReqOption({
  ...relation.sys.user,
  apiName: ApiName.del,
})

export const sysUserApis = {
  editUser: sysEditUserReqOpt,
  listUser: sysListUserReqOpt,
  delUser: sysDelUserReqOpt,
  addUser: sysAddUserReqOpt,
}
