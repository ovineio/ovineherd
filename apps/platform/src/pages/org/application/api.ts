import { publish } from '@core/utils/message'

import { sysCreateAppApi } from '~/core/api/resource'
import { getReqOption, requestByOption } from '~/core/api/utils'
import { msgKey, relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getOrgId } from '~/core/utils'

// TODO: 应用使用： 假删除。 添加冻结功能
export const getAppApis = () => {
  const editApp = getReqOption(
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

  const orgListAppApi = () =>
    requestByOption({
      ...relation.app.entity,
      apiName: ApiName.list,
      q_relation2: getOrgId(),
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

  return {
    editApp,
    orgListAppApi,
    orgDelAppApi: (id: string) => {
      const reqOption = requestByOption({
        id,
        apiType: relation.app.entity.apiType,
        apiName: ApiName.del,
      })

      return reqOption
    },
    addApp: {
      url: 'fakeAddApp',
      onFakeRequest: async (option) => {
        option.data.title = option.data.name
        await sysCreateAppApi(option.data)
        publish(msgKey.updateOrgAppList)
        return {
          status: 0,
        }
      },
    },
  }
}
