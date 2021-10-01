import { getLink } from '~/core/utils'

export const settingSchema = {
  type: 'page',
  bodyClassName: 'p-none',
  body: {
    type: 'tabs',
    mode: 'vertical',
    tabs: [
      {
        title: '个人资料',
        hash: 'userInfo',
        icon: 'fa p-r-xs fa-user-circle',
        body: [
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-md',
            bodyClassName: 'p-b-none',
            title: '当前所在组织信息',
            body: {
              type: 'form',
              wrapWithPanel: false,
              mode: 'horizontal',
              initApi: '$preset.apis.orgCacheInfo',
              controls: [
                {
                  type: 'grid',
                  mode: 'normal',
                  className: 'm-b-none',
                  columns: [
                    {
                      md: 2,
                      mode: 'normal',
                      controls: [
                        {
                          label: false,
                          type: 'static-image',
                          name: 'logo',
                        },
                      ],
                    },
                    {
                      md: 6,
                      mode: 'horizontal',
                      // horizontal: {
                      //   left: 'col-md-3',
                      //   right: 'col-md-8',
                      // },
                      controls: [
                        {
                          type: 'static',
                          name: 'name',
                          size: 'md',
                          className: 'm-b-xs',
                          label: '组织名称：',
                        },
                        {
                          type: 'static',
                          name: 'slogan',
                          className: 'm-b-xs',
                          size: 'md',
                          label: '组织标语：',
                        },
                        {
                          type: 'static',
                          name: 'desc',
                          className: 'm-b-xs',
                          size: 'md',
                          label: '组织介绍：',
                        },
                      ],
                    },
                  ],
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
            title: '我的资料',
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
                          label: '系统ID：',
                        },
                        {
                          type: 'static',
                          name: 'username',
                          label: '登录账号：',
                        },
                        {
                          type: 'static',
                          name: 'real_name',
                          placeholder: '请输入姓名',
                          label: '姓名：',
                          quickEdit: true,
                        },
                        {
                          type: 'static',
                          name: 'email',
                          placeholder: '请输入邮箱地址',
                          label: '邮箱：',
                          quickEdit: {
                            type: 'email',
                          },
                        },
                        {
                          type: 'static',
                          name: 'phone',
                          placeholder: '请输入手机号',
                          label: '手机号：',
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
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '账户安全',
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
                actionType: 'dialog',
                className: 'm-t-md',
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
        title: '组织信息',
        visibleOn: 'this.editOrg',
        hash: 'orgInfo',
        icon: 'fa p-r-xs fa-cog',
        body: {
          type: 'panel',
          className: ' ',
          headerClassName: 'cxd-section-header m-t-md m-b-md',
          bodyClassName: 'p-b-none',
          title: '组织基本信息',
          body: {
            type: 'form',
            wrapWithPanel: false,
            className: 'p-md',
            mode: 'horizontal',
            initApi: '$preset.apis.orgInfo',
            api: '$preset.apis.orgEditInfo',
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
                        placeholder: '请输入组织名称',
                        descriptionClassName: 'd-block',
                        description: '用于页面浏览器标题展示',
                      },
                      {
                        type: 'text',
                        name: 'slogan',
                        required: true,
                        label: '标语',
                        placeholder: '请输入组织标语',
                        descriptionClassName: 'd-block',
                        description: '用于介绍页面浏览器标题展示',
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
                        placeholder: '请输入组织介绍',
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
                        $ref: 'globalImgUpload',
                        label: '组织logo',
                        descriptionClassName: 'd-block',
                        description: '展示在头部导航最左侧',
                      },
                      {
                        type: 'image',
                        name: 'favicon',
                        required: true,
                        $ref: 'globalImgUpload',
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
                desc: '组织信息修改后，只有刷新页面才能看到更新后的数据',
              },
            ],
          },
        },
      },
      {
        title: '登录设置',
        hash: 'orgLogin',
        visibleOn: 'this.editLogin',
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
              initApi: '$preset.apis.orgInfo',
              api: '$preset.apis.orgEditInfo',
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
                          placeholder: '请输入组织登录标题',
                          descriptionClassName: 'd-block',
                          description: '登录页面展示标题',
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
                      $ref: 'globalImgUpload',
                      label: '登录logo',
                      descriptionClassName: 'd-block',
                      description: '用于登录页面表单展示',
                    },
                    {
                      type: 'image',
                      name: 'login_bg_img',
                      required: true,
                      $ref: 'globalImgUpload',
                      label: '登录背景',
                      descriptionClassName: 'd-block',
                      description: '用于登录背景图片展示',
                      crop: false,
                      // crop: {
                      //   aspectRatio: '16:9',
                      //   scalable: true,
                      //   rotatable: true,
                      // },
                    },
                    {
                      type: 'image',
                      name: 'login_intro_img',
                      required: true,
                      $ref: 'globalImgUpload',
                      label: '登录小图',
                      descriptionClassName: 'd-block',
                      description: '用于登录表单小图展示',
                      crop: {
                        aspectRatio: '3:4',
                        scalable: true,
                        rotatable: true,
                      },
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
      {
        title: '危险操作',
        hash: 'danger',
        visibleOn: 'false',
        icon: 'fa p-r-xs fa-power-off',
        body: [
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '退出组织',
            body: [
              {
                type: 'alert',
                body: '退出组织，您将无法再次登录到系统中',
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
            title: '转移组织',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            body: [
              {
                type: 'alert',
                body: {
                  type: 'html',
                  html: `
                    <h6 class="p-t-sm">转移须知</h6>
                    <ul>
                      <li>只能转移给组织成员，转移后该成员将拥有该组织的最高权限</li>
                      <li>您将会在转移成功后被，移出本组织</li>
                    </ul>
                  `,
                },
                level: 'info',
              },
              {
                type: 'action',
                label: '转移组织',
                level: 'danger',
              },
            ],
          },
          {
            type: 'divider',
          },
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-sm m-b-sm',
            title: '删除组织',
            body: [
              {
                type: 'alert',
                body: {
                  type: 'html',
                  html: `
                    <h6 class="p-t-sm">删除须知</h6>
                    <ul>
                      <li>删除组织前请转移相关数据，删除后将不再保存相关数据</li>
                      <li>组织删除后，所有组织成员将不能再使用本系统，请谨慎操作</li>
                    </ul>
                  `,
                },
                level: 'info',
              },
              {
                type: 'action',
                label: '删除组织',
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
        redirect: getLink('login'),
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
