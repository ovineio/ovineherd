export const schema = {
  type: 'page',
  bodyClassName: 'p-t-none p-l-none p-r-none',
  title: '应用设置',
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
        descriptionClassName: 'p-l-md',
        desc: '组织信息修改后，只有刷新页面才能看到更新后的数据',
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
