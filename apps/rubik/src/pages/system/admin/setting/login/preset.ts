import { getReqOption } from '~/core/api/utils'
import { getAppInfo } from '~/core/common'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

const appConfId = getAppInfo().id

const appInfo = getReqOption({
  apiType: relation.app.appInfo.apiType,
  apiName: ApiName.one,
  id: appConfId,
})

const editAppInfo = getReqOption({
  apiType: relation.app.appInfo.apiType,
  apiName: ApiName.edit,
})

const prest = {
  apis: {
    appInfo,
    editAppInfo,
  },
}

export default prest
