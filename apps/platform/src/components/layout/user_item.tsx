/**
 * 登录者信息
 */

import React from 'react'
import { Link } from 'react-router-dom'

import { Amis } from '@core/components/amis/schema'

import { getLink } from '~/core/utils'

import { useAppContext } from '../app/context'

import * as S from './styled'

export default () => {
  const { userInfo: info, appInfo } = useAppContext()

  if (!info) {
    return null
  }

  const loginLink = getLink('login', appInfo.orgId)
  const selfInfoLink = getLink('selfInfo', appInfo.orgId)

  const renderAvatar = () => {
    return info.avatar ? (
      <img className="avatar-img" src={info.avatar} alt="头像" />
    ) : (
      <div className="avatar-img">{info.real_name.substr(0, 1)}</div>
    )
  }

  const schema = {
    type: 'lib-dropdown',
    body: {
      type: 'container',
      body: {
        component: () => {
          return (
            <>
              <div className="avatar-item">{renderAvatar()}</div>
              <ul className="info-action">
                <li className="info-title">
                  {renderAvatar()}
                  <span>{info.real_name}</span>
                </li>
                <li>
                  <Link to={selfInfoLink}>
                    <i className="iconfont icon-myaccount" />
                    <span>个人资料</span>
                  </Link>
                </li>
                <li>
                  <Link to={loginLink}>
                    <i className="iconfont icon-exit" />
                    <span>退出登录</span>
                  </Link>
                </li>
              </ul>
            </>
          )
        },
      },
    },
  }

  return (
    <S.UserItem>
      <Amis schema={schema} />
    </S.UserItem>
  )
}
