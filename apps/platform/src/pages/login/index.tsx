/**
 * 平台登录
 */

import React from 'react'
import ContentLoader from 'react-content-loader'
import { useHistory, useLocation, Link } from 'react-router-dom'

import { useImmer } from '@core/utils/hooks'
import { setStore } from '@core/utils/store'

import { useAppContext } from '~/components/app/context'
import { sysUserLoginApi } from '~/core/api/resource'
import { storeKey } from '~/core/constants'

import { isStrTrue } from '~/core/utils'

import { Login } from './styled'

const imgSrc = 'https://static.igroupes.com/ovine_bg_cxd.jpeg'

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
  const location = useLocation()
  const { custom } = useAppContext()

  const [state, setState] = useImmer<State>(initState)

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
      onlyData: false,
    }).then((source: any) => {
      setState((d) => {
        d.loading = false
      })
      const { code, msg } = source || {}
      if (code) {
        setErrorTip(msg)
        return
      }
      const data = source
      setStore(storeKey.auth, data.id)
      setStore(storeKey.userInfo, data)

      const locState: any = location.state || { from: { pathname: '/sys/' } }
      history.replace(locState.from)
    })
  }

  return (
    <Login>
      <img src={custom.login_bg_img || imgSrc} alt="back-img" className="img-bk" />
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
            type="password"
            name="password"
            value={inputs.password || ''}
            onChange={onInputChange}
            placeholder="请输入密码"
          />
          <span className="tip-text">{tips.error}</span>
          <span className="register-text">
            {isStrTrue(custom.enable_register_org) && (
              <Link to="/sys/register" className="pull-right">
                立即申请组织
              </Link>
            )}
          </span>
          <button type="button" className="btn-submit" onClick={onSubmit}>
            {loading && <i className="fa fa-circle-o-notch fa-spin" />}
            <span>登录</span>
          </button>
        </div>
        <div className="side login-picture">
          <img src={custom.login_intro_img || imgSrc} alt="intro-img" />
        </div>
      </div>
    </Login>
  )
}
