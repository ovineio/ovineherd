import { get, filter } from 'lodash'

import { getReqOption } from '~/core/api/utils'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'
import { getOrgId, getOrgUniType, isStrTrue } from '~/core/utils'

// TODO: 组织使用： 假删除。 添加冻结功能
export const getOrgTeamApis = () => {
  const orgId = getOrgId()

  const teamTreeInfo = {
    url: 'GET /v1/option/category',
    data: {
      type: relation.org.team.type,
      parent_id: 0,
      q_relation1: orgId,
    },
    onSuccess: (source) => {
      const { option } = source.data
      source.data = {
        options: filter(get(option, '0.items'), (i) => isStrTrue(i.is_root)),
      }
      return source
    },
  }

  const addTreeNode = getReqOption({
    ...relation.org.team,
    apiName: ApiName.add,
    relation1: orgId,
    label: '$label',
    parent_id: '$parent.id',
  })

  const editTreeNode = getReqOption({
    apiType: relation.org.team.apiType,
    apiName: ApiName.edit,
    label: '$label',
    id: '$id',
  })

  const delTreeNode = getReqOption({
    apiType: relation.org.team.apiType,
    apiName: ApiName.del,
    id: '$id',
  })

  const listUser = getReqOption(
    {
      ...relation.org.user,
      type: getOrgUniType('user', orgId),
      apiName: ApiName.list,
      '&': '$$',
    },
    {
      onSuccess: (source) => {
        source.data.items = source.data.items.map((data) => {
          // eslint-disable-next-line
          const { password, relation3_data: team = {}, ...rest } = data
          return {
            team,
            ...rest,
          }
        })
        return source
      },
    }
  )

  const addUser = getReqOption({
    ...relation.org.user,
    apiName: ApiName.add,
    relation1: orgId,
    type: getOrgUniType('user', orgId),
    '&': '$$',
  })

  const editUser = getReqOption({
    apiType: relation.org.user.apiType,
    apiName: ApiName.edit,
    '&': '$$',
  })

  const delUser = getReqOption({
    apiType: relation.org.user.apiType,
    apiName: ApiName.del,
    id: '$id',
  })

  return {
    teamTreeInfo,
    addTreeNode,
    editTreeNode,
    delTreeNode,
    listUser,
    addUser,
    editUser,
    delUser,
  }
}
