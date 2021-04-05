import { chunk, map, omit } from 'lodash'

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
    q_relation1: orgId,
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
      // onPreRequest: (option) => {
      //   const { teamIds = '', roleIds = '', ...rest } = option.data
      //   const catIds = !roleIds ? teamIds : `${teamIds},${roleIds}`
      //   option.data = rest
      //   option.data.category_ids = catIds
      //   return option
      // },
      onSuccess: (source) => {
        source.data.items = source.data.items.map((data) => {
          const {
            // eslint-disable-next-line
            password,
            relation3_data: team = {},
            relation4_data: role = {},
            ...rest
          } = data
          return {
            team,
            role,
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
    relation4: '0',
  })

  // 此处所设置权限，如何对应后端接口
  const setLimit = {
    url: 'fakeSetLimit',
    onFakeRequest: async (option) => {
      const { id: roleId, limitId = '', appLimit = [], ...rest } = option.data
      const limit_raw = JSON.stringify(option.data)
      const limit_data: any = []

      const setLimitStr = (prefix, str) => {
        const valArr = str.split(',')
        valArr.forEach((v) => {
          limit_data.push(`${prefix}/${v}`)
        })
      }

      map(omit(rest, 'relation2'), (val, key) => {
        if (val) {
          setLimitStr(key, val)
        }
      })

      appLimit.forEach(({ id, limit, ignore }) => {
        if (ignore) {
          setLimitStr(`app/${id}`, 'ignore')
        }
        if (limit) {
          setLimitStr(`app/${id}`, limit)
        }
      })

      const limitInfo = { limit_raw, limit_data }

      if (limitId) {
        await requestByOption({
          apiType: relation.org.limit.apiType,
          apiName: ApiName.edit,
          id: limitId,
          ...limitInfo,
        })
      } else {
        const { id: addLimitId } = await requestByOption({
          ...relation.org.limit,
          ...limitInfo,
          apiName: ApiName.add,
        })
        await requestByOption({
          apiType: relation.org.role.apiType,
          relation2_type: relation.org.role.relation2_type,
          apiName: ApiName.edit,
          id: roleId,
          relation2: addLimitId,
        })
      }

      return {
        status: 0,
        msg: '保存成功',
      }
    },
  }

  const getLimit = getReqOption(
    {
      apiType: relation.org.limit.apiType,
      apiName: ApiName.one,
      // sendOn: '',
      relation2: '$relation2',
    },
    {
      onPreRequest: (option) => {
        option.url = option.url.replace(
          /authorization\/(.*)$/,
          `authorization/${option.data.relation2}`
        )
        option.data = {}
        return option
      },
      onSuccess: (source) => {
        try {
          source.data = JSON.parse(source.data.limit_raw)
        } catch (e) {
          //
        }
        return source
      },
    }
  )

  const appListOpts = getReqOption(
    {
      ...relation.app.entity,
      apiName: ApiName.list,
      q_relation2: orgId,
    },
    {
      expired: 30 * 1000,
      onSuccess: (source) => {
        const options = source.data.items.map((item) => {
          return {
            value: item.id,
            label: item.relation1_data.name,
          }
        })
        source.data = { options }
        return source
      },
    }
  )

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
    setLimit,
    getLimit,
    appListOpts,
  }
}
