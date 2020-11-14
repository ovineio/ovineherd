import { publish } from '@core/utils/message'

import { userSelfInfoReqOpt } from '~/core/api/resource'
import { apis, getReqOption } from '~/core/api/utils'
import { msgKey, relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getUserId } from '~/core/user'

// 登录 管理员 获取自己信息
export function sysUserSelfInfoReqOpt() {
  return userSelfInfoReqOpt({
    id: getUserId(),
  })
}

// 登录 管理员 修改自己信息
export function sysUserEditSelfReqOpt() {
  const reqOption = getReqOption(
    {
      ...relation.sys.user,
      id: getUserId(),
      apiName: ApiName.edit,
      '&': '$$',
    },
    {
      onSuccess: (source) => {
        publish(msgKey.updateSelfInfo)
        return source
      },
    }
  )

  return reqOption
}

export const sysSettingApis = {
  selfInfo: sysUserSelfInfoReqOpt(),
  editSelf: sysUserEditSelfReqOpt(),
  uploadImg: apis.file.upload,
}
