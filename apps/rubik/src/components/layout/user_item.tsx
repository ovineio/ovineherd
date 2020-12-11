/**
 * 用户头像模块
 */

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { Amis } from '@core/components/amis/schema'

import { subscribe } from '@ovine/core/lib/utils/message'

import { getOrgId } from '~/core/common'
import { defUserAvatar, msgKey } from '~/core/constants'
import { fetchUserInfo, getUserInfo } from '~/core/user'
import { getLink, linkTo, runWithQianKun } from '~/core/utils'

const StyledItem = styled.div`
  display: inline-block;
  min-width: 80px;
  img {
    width: 28px;
    height: 28px;
    margin-right: 8px;
  }
  span {
    vertical-align: middle;
  }
  .info-content {
    cursor: pointer;
  }
  .dropdown-menu {
    left: auto;
    right: 0;
  }
  i {
    top: -2px;
    font-size: 14px;
  }
`

const UserItem = () => {
  const [source, setSource] = useState<any>(getUserInfo)
  const orgId = getOrgId()
  const { avatar, real_name } = source

  useEffect(() => {
    subscribe(msgKey.updateSelfInfo, () => {
      fetchUserInfo().then((info) => {
        setSource(info)
      })
    })
  }, [])

  const renderBody = () => {
    return (
      <div className="info-content">
        <img alt="头像" src={avatar || defUserAvatar} />
        <span>{real_name || '用户姓名'}</span>
      </div>
    )
  }

  const schema = {
    type: 'lib-dropdown',
    body: {
      component: renderBody,
    },
    items: [
      {
        type: 'button',
        level: 'link',
        icon: 'iconfont icon-myaccount',
        label: '个人中心',
        onAction: () => {
          linkTo(getLink('selfInfo', orgId))
        },
      },
      runWithQianKun() && {
        type: 'button',
        level: 'link',
        icon: 'iconfont icon-di',
        label: '返回组织',
        onAction: () => {
          linkTo(getLink('home', orgId))
        },
      },
      {
        type: 'button',
        level: 'link',
        icon: 'iconfont icon-exit',
        label: '退出登录',
        onAction: () => {
          linkTo(getLink('login', orgId))
        },
      },
    ].filter(Boolean),
  }

  return (
    <StyledItem>
      <Amis schema={schema} />
    </StyledItem>
  )
}

const userItemSchema = {
  type: 'container',
  align: 'right',
  className: 'm-r-sm',
  body: {
    component: UserItem,
  },
}

export default userItemSchema
