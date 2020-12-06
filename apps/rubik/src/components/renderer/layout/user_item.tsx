import { css, DefaultTheme } from 'styled-components'

const userItemSchema = {
  type: 'lib-css',
  align: 'right',
  body: {
    type: 'service',
    // api: apis.getSelfInfo,
    body: {
      type: 'lib-dropdown',
      className: 'clickable',
      body: {
        type: 'html',
        className: 'item-user-content',
        html: `
        <img
          className="w-2x m-r-xs"
          src="$avatar"
          alt="avatar"
        />
        <span>$nickname</span>
      `,
      },
      items: [
        {
          type: 'button',
          level: 'link',
          icon: 'fa fa-edit',
          label: '个人中心',
          actionType: 'link',
          link: '/admin/self',
        },
        {
          type: 'button',
          level: 'link',
          icon: 'fa fa-edit',
          label: '返回组织',
          actionType: 'link',
          link: '/admin/setting/self',
        },
        {
          type: 'button',
          level: 'link',
          icon: 'fa fa-reply',
          label: '退出登录',
          // onClick: () => logout({ useApi: true }),
        },
      ],
    },
  },
  css: (theme: DefaultTheme) => css`
    .${theme.ns}Spinner {
      width: 25px !important;
      height: 25px !important;
    }
    .item-user-content {
      display: inline-block;
      min-width: 80px;
      img {
        width: 28px;
        height: 28px;
      }
      span {
        vertical-align: middle;
      }
    }
  `,
}

export default userItemSchema
