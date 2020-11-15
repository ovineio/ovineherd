import { sysSettingApis } from './api'

export const settingSchema = {
  type: 'page',
  bodyClassName: 'p-none',
  body: {
    type: 'tabs',
    mode: 'vertical',
    tabs: [
      {
        title: '个人信息',
        hash: 'userInfo',
        icon: 'fa p-r-xs fa-user-circle',
        body: [
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '我的基本信息',
            body: {
              type: 'form',
              wrapWithPanel: false,
              mode: 'horizontal',
              initApi: '$preset.apis.selfInfo',
              api: '$preset.apis.editSelf',
              controls: [
                {
                  type: 'grid',
                  mode: 'normal',
                  columns: [
                    {
                      md: 6,
                      mode: 'horizontal',
                      horizontal: {
                        left: 'col-md-3',
                        right: 'col-md-9',
                      },
                      controls: [
                        {
                          type: 'static',
                          name: 'id',
                          label: '系统ID',
                        },
                        {
                          type: 'static',
                          name: 'username',
                          label: '登录账号',
                        },
                        {
                          type: 'static',
                          name: 'real_name',
                          placeholder: '请输入姓名',
                          label: '姓名',
                          quickEdit: true,
                        },
                        {
                          type: 'static',
                          name: 'email',
                          placeholder: '请输入邮箱地址',
                          label: '邮箱',
                          quickEdit: {
                            type: 'email',
                          },
                        },
                        {
                          type: 'static',
                          name: 'phone',
                          placeholder: '请输入手机号',
                          label: '手机号',
                          quickEdit: true,
                        },
                      ],
                    },
                    {
                      md: 6,
                      mode: 'horizontal',
                      horizontal: {
                        left: 'col-md-3',
                        right: 'col-md-9',
                      },
                      controls: [
                        {
                          type: 'image',
                          name: 'avatar',
                          label: '头像',
                          $preset: 'apis.uploadImg',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'submit',
                  mode: 'normal',
                  className: 'm-t-lg m-b-none',
                  label: '保存个人信息',
                  icon: 'fa fa-check pull-left',
                  level: 'primary',
                  descriptionClassName: 'p-l-md',
                  desc: '已修改的数据，只有保存后，才会生效。不保存，将默认放弃修改。',
                },
              ],
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '账户安全',
            body: [
              {
                type: 'alert',
                body: '为了保障账户安全，请定期修改密码。以免密码泄漏，带来不必要的损失。',
                level: 'info',
              },
              {
                type: 'action',
                label: '修改密码',
                icon: 'fa fa-lock pull-left',
                level: 'success',
                actionType: 'dialog',
                dialog: {
                  title: '修改密码',
                  body: '$preset.forms.updatePassword',
                },
              },
            ],
          },
        ],
      },
      {
        title: '平台信息',
        hash: 'sysInfo',
        icon: 'fa p-r-xs fa-cog',
        body: [
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '平台基本信息',
            body: {
              type: 'form',
              wrapWithPanel: false,
              className: 'p-md',
              mode: 'horizontal',
              initApi: '$preset.apis.sysInfo',
              api: '$preset.apis.sysEditInfo',
              controls: [
                {
                  type: 'grid',
                  mode: 'normal',
                  columns: [
                    {
                      md: 6,
                      mode: 'horizontal',
                      horizontal: {
                        left: 'col-md-3',
                        right: 'col-md-9',
                      },
                      controls: [
                        {
                          type: 'text',
                          name: 'name',
                          required: true,
                          label: '名称',
                          placeholder: '请输入平台名称',
                          descriptionClassName: 'd-block',
                          description: '用于页面浏览器标题展示',
                        },
                        {
                          type: 'text',
                          name: 'slogan',
                          required: true,
                          label: '标语',
                          placeholder: '请输入平台标语',
                          descriptionClassName: 'd-block',
                          description: '用于介绍页面浏览器标题展示。比如登录、注册、帮助页面等',
                        },
                        {
                          type: 'text',
                          name: 'title',
                          label: '导航标题',
                          placeholder: '请输入导航标题',
                          descriptionClassName: 'd-block',
                          description: '展示在页面导航处，不填则只展示Logo',
                        },
                        {
                          type: 'textarea',
                          name: 'desc',
                          placeholder: '请输入平台介绍',
                          label: '介绍',
                        },
                      ],
                    },
                    {
                      md: 6,
                      mode: 'horizontal',
                      horizontal: {
                        left: 'col-md-3',
                        right: 'col-md-9',
                      },
                      controls: [
                        {
                          type: 'image',
                          name: 'logo',
                          required: true,
                          $preset: 'apis.uploadImg',
                          label: '平台logo',
                          descriptionClassName: 'd-block',
                          description: '展示在头部导航最左侧',
                        },
                        {
                          type: 'image',
                          name: 'favicon',
                          required: true,
                          $preset: 'apis.uploadImg',
                          label: 'favicon',
                          descriptionClassName: 'd-block',
                          description: '浏览器标题图标',
                        },
                      ],
                    },
                  ],
                },

                {
                  type: 'submit',
                  mode: 'normal',
                  className: 'm-t-lg',
                  label: '保存设置信息',
                  icon: 'fa fa-check pull-left',
                  level: 'primary',
                },
              ],
            },
          },
        ],
      },
      {
        title: '登录设置',
        hash: 'sysLogin',
        icon: 'fa p-r-xs fa-window-maximize',
        body: [
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '登录页面设置',
            body: {
              type: 'form',
              wrapWithPanel: false,
              className: 'p-md',
              mode: 'horizontal',
              initApi: '$preset.apis.sysInfo',
              api: '$preset.apis.sysEditInfo',
              controls: [
                {
                  type: 'grid',
                  mode: 'normal',
                  columns: [
                    {
                      md: 6,
                      mode: 'horizontal',
                      horizontal: {
                        left: 'col-md-3',
                        right: 'col-md-9',
                      },
                      controls: [
                        {
                          type: 'text',
                          name: 'login_title',
                          required: true,
                          label: '登录标题',
                          placeholder: '请输入平台名称',
                          descriptionClassName: 'd-block',
                          description: '登录页面表单标题',
                        },
                        {
                          name: 'enable_register_org',
                          type: 'switch',
                          trueValue: '1',
                          falseValue: '0',
                          label: '允许组织注册',
                          descriptionClassName: 'd-block',
                          description: '是否允许注册新组织',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'divider',
                },
                {
                  type: 'group',
                  mode: 'normal',
                  controls: [
                    {
                      type: 'image',
                      name: 'login_logo',
                      required: true,
                      $preset: 'apis.uploadImg',
                      label: '登录logo',
                      descriptionClassName: 'd-block',
                      description: '用于登录页面表单展示',
                    },
                    {
                      type: 'image',
                      name: 'login_bg_img',
                      required: true,
                      $preset: 'apis.uploadImg',
                      label: '登录背景',
                      descriptionClassName: 'd-block',
                      description: '用于登录背景图片展示',
                    },
                    {
                      type: 'image',
                      name: 'login_intro_img',
                      required: true,
                      $preset: 'apis.uploadImg',
                      label: '登录小图',
                      descriptionClassName: 'd-block',
                      description: '用于登录表单小图展示',
                    },
                  ],
                },

                {
                  type: 'submit',
                  mode: 'normal',
                  className: 'm-t-lg',
                  label: '保存登录设置',
                  icon: 'fa fa-check pull-left',
                  level: 'primary',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  preset: {
    apis: sysSettingApis,
    forms: {
      updatePassword: {
        type: 'form',
        messages: {
          saveSuccess: '[密码修改成功] 请使用新密码重新登录',
          saveFailed: '密码修改失败',
        },
        redirect: '/login',
        mode: 'horizontal',
        horizontal: {
          left: 'col-sm-3',
          right: 'col-sm-9',
        },
        controls: [
          {
            type: 'password',
            required: true,
            name: 'oldPassword',
            label: '旧密码',
          },
          {
            type: 'password',
            name: 'password',
            required: true,
            label: '新密码',
          },
          {
            type: 'password',
            name: 'confirmPassword',
            required: true,
            label: '重复密码',
            validationErrors: {
              equalsField: '两次密码输入不一致',
            },
            validations: {
              equalsField: 'password',
            },
          },
        ],
      },
    },
  },
}

export default settingSchema
