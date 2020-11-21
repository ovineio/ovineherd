import { publish } from '@core/utils/message'

import { userSelfInfoReqOpt } from '~/core/api/resource'
import { getOneItem, getReqOption } from '~/core/api/utils'
import { msgKey, relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getUserId } from '~/core/user'

export const getSysSettingApis = () => {
  // 登录 管理员 获取自己信息
  const sysUserSelfInfoReqOpt = userSelfInfoReqOpt({
    id: getUserId(),
  })

  // 登录 管理员 修改自己信息
  const sysUserEditSelfReqOpt = getReqOption(
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

  const sysInfoReqOpt = getReqOption(
    {
      ...relation.sys.sysInfo,
      apiName: ApiName.list,
    },
    {
      onSuccess: (source) => {
        source.data = getOneItem(source)
        return source
      },
    }
  )

  const sysEditInfoReqOpt = getReqOption(
    {
      ...relation.sys.sysInfo,
      apiName: ApiName.edit,
      '&': '$$',
    },
    {
      onSuccess: (source) => {
        source.data = {}
        return source
      },
    }
  )

  return {
    selfInfo: sysUserSelfInfoReqOpt,
    editSelf: sysUserEditSelfReqOpt,
    sysInfo: sysInfoReqOpt,
    sysEditInfo: sysEditInfoReqOpt,
  }
}
