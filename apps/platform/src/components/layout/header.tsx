import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import * as S from './styled'

type Props = {
  urlPrefix: string
  menus: Array<{
    label: string
    link: string
  }>
  // type?: 'org' | 'sys'
}
export default (props: Props) => {
  const { menus, urlPrefix } = props

  return (
    <S.Header>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light">
        <div className="container flex-wrap flex-md-nowrap py-0 px-3">
          <Link className="navbar-brand" to={urlPrefix}>
            OvineHerd
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              {menus.map((item) => {
                return (
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="nav-active"
                      to={`${urlPrefix}/${item.link}`}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
          <div>用户信息</div>
        </div>
      </nav>
    </S.Header>
  )
}
