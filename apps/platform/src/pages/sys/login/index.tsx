/**
 * 平台登录
 */

import React from 'react'

import { app } from '@core/app'

import { Login } from './styled'

const imgSrc = 'https://static.igroupes.com/ovine_bg_cxd.jpeg'

export default () => {
  const toHome = () => {
    app.routerHistory.push('/sys/')
  }
  return (
    <Login>
      <img src={imgSrc} alt="" className="img-bk" />
      <div className="login-card">
        <div className="side form">
          <div className="img-logo">OvineHerd</div>

          <span>账号</span>
          <input type="text" placeholder="请输入账号" />

          <span>密码</span>
          <input type="password" placeholder="请输入密码" />

          <button type="button" className="btn-submit" onClick={toHome}>
            登录
          </button>
        </div>
        <div className="side picture">
          <img src={imgSrc} alt="" />
        </div>
      </div>
    </Login>
  )
}
