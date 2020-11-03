import React from 'react'

import { app } from '@core/app'

import { Login } from './styled'

export default () => {
  const toHome = () => {
    app.routerHistory.push('/')
  }
  return (
    <Login>
      <img
        src="https://images.unsplash.com/photo-1557217620-07784062e4b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
        alt=""
        className="img-bk"
      />
      <div className="card">
        <div className="side form">
          <div className="img-logo">OvineHerd</div>

          <span>E-mail</span>
          <input type="text" />

          <span>Password</span>
          <input type="password" />

          <button type="button" className="btn-submit" onClick={toHome}>
            Login
          </button>
        </div>
        <div className="side picture">
          <img
            src="https://images.unsplash.com/photo-1557217620-07784062e4b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
            alt=""
          />
        </div>
      </div>
    </Login>
  )
}
