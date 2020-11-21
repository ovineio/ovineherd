import { chunk } from 'lodash'

import { getReqOption, requestByOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getOrgId, getOrgUniType } from '~/core/utils'

// TODO: 组织使用： 假删除。 添加冻结功能
export const getOrgRoleApi = () => {
  const orgId = getOrgId()

  const orgTeamOption = getReqOption(
    {
      apiType: relation.org.team.apiType,
      type: relation.org.team.type,
      q_relation1: orgId,
      apiName: ApiName.list,
      '&': '$$',
    },
    {
      onSuccess: (source) => {
        const options = source.data.items.map((item) => {
          return {
            value: item.id,
            label: item.label,
          }
        })
        source.data = { options }
        return source
      },
    }
  )

  const orgRoleOption = getReqOption(
    {
      apiType: relation.org.role.apiType,
      type: relation.org.role.type,
      relation1: orgId,
      apiName: ApiName.list,
      '&': '$$',
    },
    {
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

  const listRole = getReqOption({
    apiType: relation.org.role.apiType,
    type: relation.org.role.type,
    relation1: orgId,
    apiName: ApiName.list,
    '&': '$$',
  })

  const addRole = getReqOption({
    ...relation.org.role,
    apiName: ApiName.add,
    relation1: orgId,
    '&': '$$',
  })

  const editRole = getReqOption({
    apiType: relation.org.role.apiType,
    apiName: ApiName.edit,
    '&': '$$',
  })

  const delRole = getReqOption({
    apiType: relation.org.role.apiType,
    apiName: ApiName.del,
    id: '$id',
  })

  const listMember = getReqOption(
    {
      apiType: relation.org.user.apiType,
      type: getOrgUniType('user', orgId),
      apiName: ApiName.list,
      '&': '$$',
    },
    {
      onPreRequest: (option) => {
        const { teamIds = '', roleIds = '', ...rest } = option.data
        const catIds = !roleIds ? teamIds : `${teamIds},${roleIds}`
        option.data = rest
        option.data.category_ids = catIds
        return option
      },
      onSuccess: (source) => {
        source.data.items = source.data.items.map((data) => {
          const {
            // eslint-disable-next-line
            password,
            relation4,
            relation3_data: team = {},
            relation4_data: role = {},
            ...rest
          } = data
          return {
            team,
            role: relation4 ? role : {},
            ...rest,
          }
        })
        return source
      },
    }
  )

  const batchSetRole = {
    url: 'fakeBatchSetRole',
    onFakeRequest: (option) => {
      const { newRoleId, ids } = option.data
      const idArr = ids.split(',')
      chunk(idArr, 4).map(async (chuckIds) => {
        await Promise.all(
          chuckIds.map((uid: string) => {
            return requestByOption({
              apiType: relation.org.user.apiType,
              apiName: ApiName.edit,
              id: uid,
              relation4: newRoleId,
              relation4_type: 'category',
            })
          })
        )
      })

      return {
        status: 0,
      }
    },
  }

  const rmUserRole = getReqOption({
    apiType: relation.org.user.apiType,
    apiName: ApiName.edit,
    id: '$id',
    relation4: '',
  })

  return {
    orgTeamOption,
    orgRoleOption,
    listRole,
    addRole,
    editRole,
    delRole,
    listMember,
    batchSetRole,
    rmUserRole,
  }
}
