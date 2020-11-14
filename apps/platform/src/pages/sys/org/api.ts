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

export const sysOrgApis = {
  store,
  listOrg: sysListOrgReqOpt(),
  addOrg: sysAddOrgReqOpt(),
}
