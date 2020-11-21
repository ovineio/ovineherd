import { sysCreateOrgApi } from '~/core/api/resource'
import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

// TODO: 组织使用： 假删除。 添加冻结功能

const dataStore = {
  addOrgId: '',
}

export const getCacheStore = () => dataStore

export const getSysOrgApis = () => {
  const sysListOrgReqOpt = getReqOption(
    {
      ...relation.org.entity,
      apiName: ApiName.list,
      '&': '$$',
    },
    {
      onSuccess: (source) => {
        source.data.items = source.data.items.map((data) => {
          const { relation1_data: config, relation2_data: user, ...rest } = data
          return {
            config,
            user,
            ...rest,
          }
        })
        return source
      },
    }
  )

  const sysAddOrgReqOpt = {
    url: 'fakeAddOrg',
    onFakeRequest: async (option) => {
      option.data.title = option.data.name
      const { orgId } = await sysCreateOrgApi(option.data)
      dataStore.addOrgId = orgId
      return {
        status: 0,
      }
    },
  }

  const sysEditOrgReqOpt = getReqOption({
    ...relation.org.orgInfo,
    apiName: ApiName.edit,
    '&': '$$',
  })

  const sysListApplyReqOpt = getReqOption({
    ...relation.sys.orgRegisterApply,
    apiName: ApiName.list,
    '&': '$$',
  })

  const sysCheckOrgApplyReqOpt = getReqOption({
    ...relation.sys.orgRegisterApply,
    apiName: ApiName.edit,
    '&': '$$',
  })

  const sysDelOrgReqOpt = getReqOption({
    ...relation.org.entity,
    apiName: ApiName.del,
  })

  return {
    listOrg: sysListOrgReqOpt,
    listOrgApply: sysListApplyReqOpt,
    checkOrgApply: sysCheckOrgApplyReqOpt,
    delOrg: sysDelOrgReqOpt,
    addOrg: sysAddOrgReqOpt,
    editOrg: sysEditOrgReqOpt,
  }
}
