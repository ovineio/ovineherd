import { confirm } from 'amis'

import { app } from '@ovine/core/lib/app'

import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getLink } from '~/core/utils'

const store = {
  addOrgId: '',
}

function sysRegisterReqOpt() {
  const reqOption = getReqOption(
    {
      ...relation.sys.orgRegisterApply,
      apiName: ApiName.add,
      '&': '$$',
    },
    {
      onSuccess: (source, option) => {
        if (source.status === 0) {
          confirm(
            `组织申请已经提交，请勿重复提交相同申请。本次申请将在一个工作日内处理，请耐心等待。申请结果将发送到指定邮箱 "${option.data.email}"，请注意查收。`,
            '申请提交成功',
            '我知道了'
          ).then(() => {
            app.routerHistory.push(getLink('login'))
          })
        }

        source.data = {}
        return source
      },
    }
  )

  return reqOption
}

export const registerApis = {
  store,
  registerOrg: sysRegisterReqOpt(),
}
