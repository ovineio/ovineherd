import { tabsPageCss } from '~/styled/global'

const isolation = 'data.isolation !== "1"'

export const schema = {
  type: 'page',
  css: tabsPageCss,
  body: {
    type: 'tabs',
    mode: 'line',
    className: 'g-normal-spinner',
    tabs: [
      {
        title: '展示设置',
        hash: 'userInfo',
        icon: 'iconfont icon-ar p-r-xs',
        body: {
          type: 'form',
          wrapWithPanel: false,
          className: 'p-xl g-normal-spinner',
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
              className: 'm-t-lg',
              mode: 'normal',
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
      },
      {
        title: '环境变量',
        hash: 'env',
        icon: 'iconfont icon-fin-center  p-r-xs',
        body: {
          type: 'form',
          wrapWithPanel: false,
          className: 'p-xl p-t-lg g-normal-spinner',
          mode: 'normal',
          initApi: '$preset.apis.listEnv',
          controls: [
            {
              type: 'table',
              name: 'constants',
              addable: true,
              editable: true,
              removable: true,
              draggable: true,
              affixHeader: false,
              columnsTogglable: true,
              $preset: 'apis.onOrderChange',
              addApi: '$preset.apis.addEnv',
              updateApi: '$preset.apis.editEnv',
              deleteApi: '$preset.apis.delEnv',
              inputClassName: 'g-no-border-table',
              columns: [
                {
                  label: '变量名',
                  name: 'name',
                  remark: '变量名只允许大写字母，数字，下划线的组合。例如：A_0',
                  quickEdit: {
                    type: 'text',
                    required: true,
                    placeholder: '请输入变量名(大写字母)',
                  },
                },
                {
                  label: '变量值',
                  name: 'value',
                  quickEdit: {
                    type: 'text',
                    required: true,
                    placeholder: '请输入变量值',
                  },
                },
                {
                  name: 'desc',
                  label: '变量描述',
                  quickEdit: {
                    type: 'text',
                    placeholder: '请输入变量描述',
                  },
                },
              ],
            },
          ],
        },
      },
      {
        title: '接口设置',
        hash: 'request',
        icon: 'iconfont icon-blb p-r-xs',
        body: {
          type: 'form',
          className: 'p-xl p-b-md g-normal-spinner',
          mode: 'normal',
          affixFooter: true,
          initApi: '$preset.apis.appInfo',
          api: '$preset.apis.editAppInfo',
          actions: [
            {
              type: 'tpl',
              className: 'pull-left',
              tpl: '<div class="m-l-md">&nbsp;</div>',
            },
            {
              type: 'submit',
              mode: 'normal',
              level: 'primary',
              label: '保存设置',
              icon: 'fa fa-check pull-left',
              className: 'pull-left',
            },
          ],
          controls: [
            {
              type: 'text',
              name: 'request_base_url',
              mode: 'inline',
              className: 'm-r-md',
              label: '请求API默认前缀',
              desc: '请使用完整http地址，比如: https://api.com',
              size: 'lg',
              validations: {
                isUrl: true,
              },
            },
            {
              type: 'button-group',
              name: 'request_data_type',
              mode: 'inline',
              label: '默认请求格式',
              value: 'json',
              options: [
                {
                  label: 'JSON',
                  value: 'json',
                },
                {
                  label: 'Form',
                  value: 'form',
                },
                {
                  label: 'FormData',
                  value: 'form-data',
                },
              ],
            },
            {
              type: 'editor',
              name: 'request_pre_request',
              language: 'javascript',
              label: '请求前回调',
            },
            {
              type: 'editor',
              name: 'request_success',
              language: 'javascript',
              label: '请求成功回调',
            },
            {
              type: 'editor',
              name: 'request_error',
              language: 'javascript',
              label: '请求失败回调',
            },
          ],
        },
      },
    ],
  },
}
