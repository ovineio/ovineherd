export const schema = {
  type: 'page',
  title: '登录设置',
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
            md: 5,
            mode: 'horizontal',
            horizontal: {
              left: 'col-md-2',
              right: 'col-md-10',
            },
            controls: [
              {
                type: 'text',
                name: 'login_title',
                required: true,
                label: '登录标题',
                placeholder: '请输入应用登录标题',
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
          },
          {
            type: 'image',
            name: 'login_intro_img',
            required: true,
            $ref: 'globalImgUpload',
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
        descriptionClassName: 'p-l-md',
        desc: '修改表单信息后，请点击保存才能生效',
      },
    ],
  },
}
