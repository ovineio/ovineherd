import { findIndex, pick, remove, uniqueId } from 'lodash'

import { getReqOption, requestByOption } from '~/core/api/utils'
import { getAppInfo, setOvineConstants, syncAppInfo } from '~/core/common'
import { relation } from '~/core/constants'
import { ApiName } from '~/core/types'

export const getSettingApis = () => {
  const appConfId = getAppInfo().id
  let envList = []

  const appInfo = getReqOption({
    apiType: relation.app.appInfo.apiType,
    apiName: ApiName.one,
    id: appConfId,
  })

  const editAppInfo = getReqOption(
    {
      apiType: relation.app.appInfo.apiType,
      apiName: ApiName.edit,
    },
    {
      onSuccess: (source, option) => {
        syncAppInfo(option.data)
        return source
      },
    }
  )

  const checkEnvData = (data: any): any => {
    if (!data.name || !data.value) {
      return {
        status: -1,
        msg: '请填写变量名与变量值',
      }
    }

    if (!data.id) {
      if (envList.find((i) => i.name === data.name)) {
        return {
          status: -1,
          msg: '权限 KEY 不能重复',
        }
      }
    }
    if (!/[_A-Z0-9]/.test(data.name)) {
      return {
        status: -1,
        msg: '[变量名格式不正确] 请使用大写字母作为变量名',
      }
    }

    return ''
  }

  const envCtrl = async (type: string): Promise<any> => {
    const reqOpt = {
      id: appConfId,
      apiType: relation.app.appInfo.apiType,
    }

    switch (type) {
      case 'get': {
        const { app_env_constants } = await requestByOption({
          ...reqOpt,
          apiName: ApiName.one,
          onlyData: true,
        })
        return app_env_constants
      }
      case 'save': {
        setOvineConstants(envList)
        const saveRes = await requestByOption({
          ...reqOpt,
          apiName: ApiName.edit,
          app_env_constants: JSON.stringify(
            envList.map((i) => {
              return pick(i, ['name', 'value', 'desc'])
            })
          ),
        })
        return saveRes
      }

      default:
        return ''
    }
  }

  const listEnv = {
    url: 'fakeListEnv',
    onFakeRequest: async () => {
      envList = []
      const envArr = await envCtrl('get')
      if (envArr) {
        envList = JSON.parse(envArr) || []
        envList.map((i) => {
          i.id = uniqueId()
          return i
        })
      }
      return {
        data: {
          constants: envList,
        },
      }
    },
  }

  const editEnv = {
    url: 'PUT fakeEditEnv',
    onFakeRequest: async (option) => {
      const { id } = option.data
      const checkRes = checkEnvData(option.data)
      if (checkRes) {
        return checkRes
      }
      const idx = findIndex(envList, { id })
      if (idx !== -1) {
        envList[idx] = option.data
      }
      await envCtrl('save')
      return {
        status: 0,
        msg: '修改成功',
      }
    },
  }

  const delEnv = {
    url: 'PUT fakeDelEnv',
    onFakeRequest: async (option) => {
      const { id } = option.data
      remove(envList, { id })
      await envCtrl('save')
      return {
        status: 0,
        msg: '已删除',
      }
    },
  }

  const addEnv = {
    url: 'POST fakeAddEnv',
    onFakeRequest: async (option) => {
      const checkRes = checkEnvData(option.data)
      if (checkRes) {
        return checkRes
      }
      envList.push(option.data)
      await envCtrl('save')
      return {
        status: 0,
        msg: '保存成功',
      }
    },
  }

  const onOrderChange = {
    onChange: (curr, prev) => {
      if (curr.length && curr.length === prev.length) {
        if (curr.map((i) => i.id).join(',') !== prev.map((i) => i.id).join(',')) {
          envList = curr
          envCtrl('save')
        }
      }
    },
  }

  return {
    appInfo,
    editAppInfo,
    listEnv,
    editEnv,
    delEnv,
    addEnv,
    onOrderChange,
  }
}

const getPreset = () => ({
  apis: getSettingApis(),
})

export default getPreset
