import React from 'react'
import { Link } from 'react-router-dom'

import * as S from './styled'

export default () => {
  return (
    <S.Header>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light">
        <div className="container flex-wrap flex-md-nowrap py-0 px-3">
          <a className="navbar-brand" href="/">
            OvineHerd
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/app">
                  应用
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/team">
                  团队
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/role">
                  角色
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/setting">
                  设置
                </Link>
              </li>
            </ul>
          </div>
          <div>用户信息</div>
        </div>
      </nav>
    </S.Header>
  )
}
