const isolation = 'data.isolation !== "1"'

export const schema = {
  type: 'page',
  title: '应用设置',
  body: {
    type: 'form',
    wrapWithPanel: false,
    className: 'p-md g-normal-spinner',
    mode: 'horizontal',
    initApi: '$preset.apis.appInfo',
    api: '$preset.apis.editAppInfo',
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
                hiddenOn: isolation,
                type: 'text',
                name: 'name',
                required: true,
                label: '名称',
                placeholder: '请输入应用名称',
                descriptionClassName: 'd-block',
                description: '用于页面浏览器标题展示',
              },
              {
                hiddenOn: isolation,
                type: 'text',
                name: 'slogan',
                required: true,
                label: '标语',
                placeholder: '请输入应用标语',
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
                placeholder: '请输入应用介绍',
                label: '应用介绍',
              },
            ],
          },
          {
            md: 5,
            mode: 'horizontal',
            columnClassName: 'm-l-md',
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
                label: '应用logo',
                descriptionClassName: 'd-block',
                description: '展示在侧边栏上方',
              },
              {
                hiddenOn: isolation,
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
        type: 'container',
        label: ' ',
        className: 'm-t-lg',
        inputClassName: 'd-inline-block',
        descriptionClassName: 'p-l-md',
        desc: '应用信息修改后，刷新页面后才能看到效果',
        body: {
          type: 'submit',
          mode: 'normal',
          label: '保存设置信息',
          icon: 'fa fa-check pull-left',
          level: 'primary',
        },
      },
    ],
  },
}
