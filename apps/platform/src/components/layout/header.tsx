import React from 'react'
import ContentLoader from 'react-content-loader'
import { Link, NavLink } from 'react-router-dom'

import { useAppContext } from '../app/context'

import * as S from './styled'
import UserItem from './user_item'

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
  const { custom } = useAppContext()

  const { title, logo } = custom

  return (
    <S.Header>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light">
        <div className="container flex-wrap flex-md-nowrap py-0 px-3">
          {!logo ? (
            <ContentLoader
              speed={2}
              width={140}
              height={40}
              viewBox="0 0 140 40"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="50" y="8" rx="0" ry="0" width="90" height="24" />
              <circle cx="20" cy="20" r="20" />
            </ContentLoader>
          ) : (
            <Link className="navbar-brand" to={urlPrefix}>
              <img alt="logo" src={logo} />
              <span>{title}</span>
            </Link>
          )}
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
          <UserItem />
        </div>
      </nav>
    </S.Header>
  )
}
