import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getAppId, getAppUniType } from '~/core/utils'

// TODO: 可直接从组织中选用户
const getAppUserApis = () => {
  const appId = getAppId()
  const appUserType = getAppUniType('user', appId)
  // 查询 用户 列表
  const listUser = getReqOption({
    ...relation.app.user,
    type: appUserType,
    apiName: ApiName.list,
    '&': '$$',
  })

  // 添加 用户
  const addUser = getReqOption({
    ...relation.app.user,
    apiName: ApiName.add,
    type: appUserType,
    '&': '$$',
  })

  // 编辑 用户
  const editUser = getReqOption({
    apiType: relation.app.user.apiType,
    apiName: ApiName.edit,
    '&': '$$',
  })

  // 删除 用户
  const delUser = getReqOption({
    ...relation.sys.user,
    apiName: ApiName.del,
  })

  const appRoleOption = getReqOption(
    {
      apiType: relation.app.role.apiType,
      type: relation.app.role.type,
      q_relation1: appId,
      apiName: ApiName.list,
      '&': '$$',
    },
    {
      cache: 1000,
      onSuccess: (source) => {
        const options = source.data.items.map((item) => {
          return {
            value: item.id,
            label: item.name,
          }
        })
        source.data = { options }
        return source
      },
    }
  )

  const appUserApis = {
    editUser,
    listUser,
    delUser,
    addUser,
    appRoleOption,
  }

  return appUserApis
}

const getPreset = () => ({
  apis: getAppUserApis(),
  limits: {
    $page: {
      label: '访问页面',
    },
    edit: {
      label: '编辑',
    },
    add: {
      label: '添加',
      needs: ['edit'],
    },
    del: {
      label: '删除',
      needs: ['edit'],
    },
  },
})

export default getPreset
