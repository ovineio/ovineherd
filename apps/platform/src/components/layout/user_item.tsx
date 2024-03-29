/**
 * 登录者信息
 */

import React from 'react'
import ContentLoader from 'react-content-loader'
import { Link } from 'react-router-dom'

import { Amis } from '@core/components/amis/schema'
import { publish } from '@ovine/core/lib/utils/message'

import { msgKey } from '~/core/constants'
import { setUserInfo } from '~/core/user'
import { getLink } from '~/core/utils'

import { useAppContext } from '../app/context'
import * as S from './styled'

export default () => {
  const { userInfo: info = {}, appInfo, setContext } = useAppContext()

  const loginLink = getLink('login', appInfo.orgId)
  const selfInfoLink = getLink('selfInfo', appInfo.orgId)

  const onLoginOutCLick = () => {
    setUserInfo({})
    setContext((d) => {
      d.userInfo = undefined
    })
  }

  const renderAvatar = () => {
    return info.avatar || !info.real_name ? (
      <img
        className="avatar-img text-sm"
        src={info.avatar || 'http://static.igroupes.com/default_avatar.jpg'}
        alt="头像"
      />
    ) : (
      <div className="avatar-img">{info.real_name.substr(0, 1)}</div>
    )
  }

  if (!info.id) {
    return (
      <ContentLoader
        speed={2}
        width={40}
        height={40}
        viewBox="0 0 40 40"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="20" cy="20" r="20" />
      </ContentLoader>
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
                  <span>{info.real_name || '未填写姓名'}</span>
                </li>
                <li>
                  <Link to={selfInfoLink} onClick={() => publish(msgKey.activeUserInfoTab)}>
                    <i className="iconfont icon-myaccount" />
                    <span>个人资料</span>
                  </Link>
                </li>
                <li>
                  <Link to={loginLink} onClick={onLoginOutCLick}>
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
