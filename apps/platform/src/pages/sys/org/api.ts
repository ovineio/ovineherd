import { sysCreateOrgApi } from '~/core/api/resource'
import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

const store = {
  addOrgId: '',
}

function sysListOrgReqOpt() {
  const reqOption = getReqOption(
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

  return reqOption
}

function sysAddOrgReqOpt() {
  return {
    url: 'fakeAddOrg',
    onFakeRequest: async (option) => {
      option.data.title = option.data.name
      const { orgId } = await sysCreateOrgApi(option.data)
      store.addOrgId = orgId
      return {
        status: 0,
      }
    },
  }
}

function sysEditOrgReqOpt() {
  const reqOption = getReqOption({
    ...relation.org.orgInfo,
    apiName: ApiName.edit,
    '&': '$$',
  })

  return reqOption
}

function sysListApplyReqOpt() {
  const reqOption = getReqOption({
    ...relation.sys.orgRegisterApply,
    apiName: ApiName.list,
    '&': '$$',
  })

  return reqOption
}

function sysCheckOrgApplyReqOpt() {
  const reqOption = getReqOption({
    ...relation.sys.orgRegisterApply,
    apiName: ApiName.edit,
    '&': '$$',
  })

  return reqOption
}

export function sysDelOrgReqOpt() {
  const reqOption = getReqOption({
    ...relation.org.entity,
    apiName: ApiName.del,
  })

  return reqOption
}

export const sysOrgApis = {
  store,
  listOrg: sysListOrgReqOpt(),
  listOrgApply: sysListApplyReqOpt(),
  checkOrgApply: sysCheckOrgApplyReqOpt(),
  delOrg: sysDelOrgReqOpt(),
  addOrg: sysAddOrgReqOpt(),
  editOrg: sysEditOrgReqOpt(),
}
