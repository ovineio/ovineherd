import { sysCreateOrgApi } from '~/core/api/resource'
import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

const store = {
  addOrgId: '',
}

function sysListOrgReqOpt() {
  const reqOption = getReqOption({
    ...relation.org.entity,
    apiName: ApiName.list,
    '&': '$$',
  })

  return reqOption
}

function sysAddOrgReqOpt() {
  return {
    url: 'fakeAddOrg',
    onFakeRequest: async (option) => {
      const { orgId } = await sysCreateOrgApi(option.data)
      store.addOrgId = orgId
      return {
        status: 0,
      }
    },
  }
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

export const sysOrgApis = {
  store,
  listOrg: sysListOrgReqOpt(),
  listOrgApply: sysListApplyReqOpt(),
  checkOrgApply: sysCheckOrgApplyReqOpt(),
  addOrg: sysAddOrgReqOpt(),
}
