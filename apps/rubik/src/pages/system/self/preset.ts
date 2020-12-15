import { publish } from '@core/utils/message'

import { userSelfInfoReqOpt } from '~/core/api/resource'
import { getReqOption } from '~/core/api/utils'
import { msgKey, relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getUserId } from '~/core/user'

export const getSelfApis = () => {
  // 登录 管理员 获取自己信息
  const selfInfo = userSelfInfoReqOpt({
    id: getUserId(),
  })

  // 登录 管理员 修改自己信息
  const editSelf = getReqOption(
    {
      ...relation.app.user,
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

  return {
    selfInfo,
    editSelf,
  }
}

const getPreset = () => ({
  apis: getSelfApis(),
})

export default getPreset
