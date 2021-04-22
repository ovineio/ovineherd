import { tabsPageCss } from '~/styled/global'

export const schema = {
  type: 'page',
  css: tabsPageCss,
  body: {
    type: 'tabs',
    mode: 'line',
    className: 'g-normal-spinner',
    tabs: [
      {
        title: '个人资料',
        hash: 'userInfo',
        icon: 'fa p-r-xs fa-user-circle',
        body: [
          {
            type: 'panel',
            className: 'p-md',
            headerClassName: 'app-section-header m-t-md m-b-sm',
            title: '我的资料',
            body: {
              type: 'form',
              wrapWithPanel: false,
              mode: 'horizontal',
              initApi: '$preset.apis.selfInfo',
              api: '$preset.apis.editSelf',
              className: 'p-md ',
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
                          $ref: 'globalImgUpload',
                          type: 'image',
                          name: 'avatar',
                          label: '头像',
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
                  desc: '已修改的数据，只有保存后才会生效。不保存将默认放弃修改。',
                },
              ],
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'panel',
            className: 'p-md',
            headerClassName: 'app-section-header m-t-md m-b-sm',
            title: '账户安全',
            bodyClassName: 'p-md',
            body: [
              {
                type: 'alert',
                body: '为了保障账户安全，请定期修改密码。以免密码遗漏，带来不要的损失。',
                level: 'info',
              },
              {
                type: 'action',
                label: '修改密码',
                icon: 'fa fa-lock pull-left',
                level: 'success',
                className: 'm-t-md',
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
        title: '危险操作',
        hash: 'danger',
        icon: 'fa p-r-xs fa-power-off',
        body: [
          {
            type: 'panel',
            className: 'p-md',
            bodyClassName: 'p-md',
            headerClassName: 'app-section-header m-t-md m-b-sm',
            title: '退出应用',
            body: [
              {
                type: 'alert',
                body: '退出应用，您将无法再次登录到系统中',
                level: 'info',
              },
              {
                type: 'action',
                label: '退出组织',
                level: 'danger',
              },
            ],
          },
          {
            type: 'divider',
          },

          {
            type: 'panel',
            title: '转移应用',
            className: 'p-md',
            bodyClassName: 'p-md',
            headerClassName: 'app-section-header m-t-md m-b-sm',
            body: [
              {
                type: 'alert',
                body: {
                  type: 'html',
                  html: `
                    <h6 class="p-t-sm">转移须知</h6>
                    <ul>
                      <li>只能转移给组织成员，转移后该成员将拥有该应用的最高权限</li>
                      <li>您将会在转移成功后被，移出本应用</li>
                    </ul>
                  `,
                },
                level: 'info',
              },
              {
                type: 'action',
                label: '转移应用',
                level: 'danger',
              },
            ],
          },
          {
            type: 'divider',
          },
          {
            type: 'panel',
            className: 'p-md',
            bodyClassName: 'p-md',
            headerClassName: 'app-section-header m-t-sm m-b-sm',
            title: '删除应用',
            body: [
              {
                type: 'alert',
                body: {
                  type: 'html',
                  html: `
                    <h6 class="p-t-sm">删除须知</h6>
                    <ul>
                      <li>删除应用前请转移相关数据，删除后将不再保存相关数据</li>
                      <li>应用删除后，所有应用成员将不能再使用本系统，请谨慎操作</li>
                    </ul>
                  `,
                },
                level: 'info',
              },
              {
                type: 'action',
                label: '删除应用',
                level: 'danger',
              },
            ],
          },
        ],
      },
    ],
  },
  preset: {
    forms: {
      updatePassword: {
        type: 'form',
        messages: {
          saveSuccess: '[密码修改成功] 请使用新密码重新登录',
          saveFailed: '密码修改失败',
        },
        // redirect: getLink('login'),
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
