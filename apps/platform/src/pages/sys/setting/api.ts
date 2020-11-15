import { publish } from '@core/utils/message'

import { userSelfInfoReqOpt } from '~/core/api/resource'
import { apis, getOneItem, getReqOption } from '~/core/api/utils'
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

function sysInfoReqOpt() {
  const reqOption = getReqOption(
    {
      ...relation.sys.entityInfo,
      apiName: ApiName.list,
    },
    {
      onSuccess: (source) => {
        source.data = getOneItem(source)
        return source
      },
    }
  )

  return reqOption
}

function sysEditInfoReqOpt() {
  const reqOption = getReqOption(
    {
      ...relation.sys.entityInfo,
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

  return reqOption
}

export const sysSettingApis = {
  uploadImg: {
    maxSize: 500 * 1000,
    limit: {
      maxWidth: 500,
      maxHeight: 500,
    },
    crop: {
      aspectRatio: 1,
      scalable: true,
      rotatable: true,
    },
    reciever: apis.file.upload,
  },
  selfInfo: sysUserSelfInfoReqOpt(),
  editSelf: sysUserEditSelfReqOpt(),
  sysInfo: sysInfoReqOpt(),
  sysEditInfo: sysEditInfoReqOpt(),
}
