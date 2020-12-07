/**
 * 平台登录
 */

import React from 'react'
import ContentLoader from 'react-content-loader'
import { useHistory } from 'react-router-dom'

import { useImmer } from '@core/utils/hooks'
import { setStore } from '@core/utils/store'

import { Login } from './styled'
import { getAppUniType, getOrgUniType } from '~/core/utils'
import { storeKey } from '~/core/constants'
import { setUserInfo } from '~/core/user'
import { sysUserLoginApi } from '~/core/api/resource'
import { getAppCustom, isAppIsolation } from '~/core/common'

type State = {
  inputs: {
    username: string
    password: string
  }
  loading: boolean
  tips: {
    error?: string
  }
}

const initState = {
  inputs: {
    username: '',
    password: '',
  },
  loading: false,
  tips: {},
}
export default () => {
  const history = useHistory()

  const [state, setState] = useImmer<State>(initState)
  const custom = getAppCustom()

  const { inputs, tips, loading } = state

  const onInputChange = (e: any) => {
    const { name, value } = e.target
    setState((d) => {
      d.inputs[name] = value
      d.tips.error = ''
    })
  }

  const setErrorTip = (tip: string) => {
    setState((d) => {
      d.tips.error = tip
    })
  }

  const onSubmit = () => {
    const { password, username } = inputs
    if (!username) {
      setErrorTip('请输入登录账号')
      return
    }
    if (!password) {
      setErrorTip('请输入密码')
      return
    }
    setState((d) => {
      d.loading = true
    })

    sysUserLoginApi({
      ...inputs,
      type: isAppIsolation(true) ? getAppUniType('user') : getOrgUniType('user'),
      onlyData: false,
    }).then((source: any) => {
      setState((d) => {
        d.loading = false
      })
      const { code, msg, data } = source || {}
      if (code) {
        setErrorTip(msg)
        return
      }
      setStore(storeKey.auth, data.id)
      setUserInfo(data)

      history.replace(custom.app_root_route)
    })
  }

  return (
    <Login>
      <img src={custom.login_bg_img} alt="back-img" className="img-bk" />
      <div className="login-card">
        <div className="side login-form">
          {!custom.login_logo ? (
            <div className="logo-brand">
              <ContentLoader
                speed={2}
                width={200}
                height={70}
                viewBox="0 0 200 70"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
                <circle cx="100" cy="20" r="20" />
                <rect x="20" y="50" rx="0" ry="0" width="160" height="20" />
              </ContentLoader>
            </div>
          ) : (
            <div className="logo-brand">
              <img alt="logo" src={custom.login_logo} />
              <span>{custom.login_title}</span>
            </div>
          )}
          <form>
            <span>账号</span>
            <input
              type="text"
              name="username"
              value={inputs.username || ''}
              onChange={onInputChange}
              placeholder="请输入账号"
            />

            <span>密码</span>
            <input
              autoComplete="off"
              type="password"
              name="password"
              value={inputs.password || ''}
              onChange={onInputChange}
              placeholder="请输入密码"
            />
            <span className="tip-text">{tips.error}</span>
            <button type="button" className="btn-submit" onClick={onSubmit}>
              {loading && <i className="fa fa-circle-o-notch fa-spin" />}
              <span>登录</span>
            </button>
          </form>
        </div>
        <div className="side login-picture">
          <img src={custom.login_intro_img} alt="intro-img" />
        </div>
      </div>
    </Login>
  )
}
