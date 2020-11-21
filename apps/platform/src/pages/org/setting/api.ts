import { publish } from '@core/utils/message'
import { getStore } from '@ovine/core/lib/utils/store'

import { userSelfInfoReqOpt } from '~/core/api/resource'
import { getReqOption } from '~/core/api/utils'
import { msgKey, relation, storeKey } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getUserId } from '~/core/user'

export const getOrgSettingApis = () => {
  return {
    orgCacheInfo: {
      url: 'fakeAddApp',
      onFakeRequest: () => {
        return {
          status: 0,
          data: getStore(storeKey.orgInfo),
        }
      },
    },
    selfInfo: userSelfInfoReqOpt({
      id: getUserId(),
    }),
    editSelf: getReqOption(
      {
        apiType: relation.org.user.apiType,
        apiName: ApiName.edit,
      },
      {
        onSuccess: (source) => {
          publish(msgKey.updateSelfInfo)
          return source
        },
      }
    ),
    orgInfo: getReqOption({
      apiType: relation.org.orgInfo.apiType,
      apiName: ApiName.one,
      id: getStore<any>(storeKey.orgInfo)?.id,
    }),
    orgEditInfo: getReqOption({
      apiType: relation.org.orgInfo.apiType,
      apiName: ApiName.edit,
    }),
  }
}
