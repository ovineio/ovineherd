import { publish } from '@core/utils/message'

import { sysCreateAppApi } from '~/core/api/resource'
import { getReqOption, requestByOption } from '~/core/api/utils'
import { msgKey, relation } from '~/core/constants'
import { ApiName } from '~/core/types'

function orgListAppApi() {
  return requestByOption({
    ...relation.app.entity,
    apiName: ApiName.list,
  }).then((source) => {
    const items = source.items.map((data) => {
      const { relation1_data: config, relation2_data: user = {}, ...rest } = data
      return {
        config,
        user,
        ...rest,
      }
    })
    return items
  })
}

function orgAddAppReqOpt() {
  return {
    url: 'fakeAddApp',
    onFakeRequest: async (option) => {
      option.data.title = option.data.name
      await sysCreateAppApi(option.data)
      publish(msgKey.updateOrgAppList)
      return {
        status: 0,
      }
    },
  }
}

function orgEditAppReqOpt() {
  const reqOption = getReqOption(
    {
      ...relation.app.appInfo,
      apiName: ApiName.edit,
      '&': '$$',
    },
    {
      onPreRequest: async (option) => {
        // eslint-disable-next-line
        const { username, user_id, password, ...reset } = option.data

        // 修改密码
        if (option.data.isolation === '1' && user_id && password) {
          await requestByOption({
            password,
            apiType: relation.app.user.apiType,
            apiName: ApiName.edit,
            id: user_id,
          })
        }

        option.data = reset

        return option
      },
      onSuccess: (source) => {
        publish(msgKey.updateOrgAppList)
        return source
      },
    }
  )

  return reqOption
}

function orgDelAppApi(id: string) {
  const reqOption = requestByOption({
    id,
    ...relation.app.entity,
    apiName: ApiName.del,
  })

  return reqOption
}

export const appApis = {
  orgListAppApi,
  orgDelAppApi,
  addApp: orgAddAppReqOpt(),
  editApp: orgEditAppReqOpt(),
}
