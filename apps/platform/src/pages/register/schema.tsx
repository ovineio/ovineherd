import { app } from '@ovine/core/lib/app'

import { getLink } from '~/core/utils'

import { registerApis } from './api'

const registerSchema = {
  type: 'page',
  preset: {
    apis: registerApis,
  },
  body: {
    type: 'container',
    className: 'register-card',
    body: [
      {
        type: 'tpl',
        tpl: `
          <h6 class="cxd-section-header m-t-sm m-b-lg">申请一个新组织，即可快速建站</h6>
        `,
      },
      {
        type: 'form',
        mode: 'horizontal',
        api: '$preset.apis.registerOrg',
        actions: [
          {
            type: 'submit',
            label: '提交申请',
            icon: 'fa fa-check pull-left',
            level: 'primary',
          },
          {
            type: 'action',
            label: '关闭申请',
            icon: 'fa fa-remove pull-left',
            level: 'light',
            onAction: () => {
              app.routerHistory.push(getLink('login'))
            },
          },
        ],
        controls: [
          {
            name: 'email',
            label: '邮箱地址',
            type: 'email',
            required: true,
            validations: {
              minLength: 5,
            },
            placeholder: '请输入邮箱地址',
            descriptionClassName: 'd-block',
            description: '申请结果将发送至该邮箱，请务必填正确地址',
          },
          {
            name: 'username',
            label: '登录账号',
            type: 'text',
            required: true,
            validations: {
              minLength: 4,
            },
            placeholder: '请输入登录账号',
            descriptionClassName: 'd-block',
            description: '用于组织登录的账号',
          },
          {
            name: 'name',
            label: '组织名称',
            type: 'text',
            required: true,
            validations: {
              minLength: 2,
            },
            placeholder: '请输入组织名称',
          },
          {
            name: 'logo',
            label: '组织LOGO',
            type: 'image',
          },
          {
            name: 'desc', // 用于平台使用的组织描述
            label: '组织描述',
            type: 'textarea',
            placeholder: '请输入组织描述',
          },
        ],
      },
    ],
  },
}

export default registerSchema
