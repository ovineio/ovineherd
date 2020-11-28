import { addLibRenderer } from '@core/components/amis/lib_renderer'

import { apis } from './api/utils'
import { emptyListHolder } from './constants'

export const schemaDefinitions = {
  globalImageCell: {
    className: 'table-cell-image',
    thumbMode: 'cover',
    type: 'image',
    enlargeAble: true,
  },
  globalFileUpload: {
    reciever: apis.file.upload,
  },
  globalSwitch: {
    type: 'switch',
    trueValue: '1',
    falseValue: '0',
  },
  globalTableReloadTool: {
    type: 'action',
    actionType: 'reload',
    reload: true,
    icon: 'fa fa-refresh',
    tooltip: '刷新数据',
  },
  globalImgUpload: {
    reciever: apis.file.upload,
    maxSize: 500 * 1000,
    limit: {
      maxWidth: 2000,
      maxHeight: 2000,
    },
    crop: {
      aspectRatio: 1,
      scalable: true,
      rotatable: true,
    },
  },
  globalCrudCCommon: {
    filterTogglable: false,
    perPageAvailable: [20, 50, 150],
    defaultParams: {
      perPage: 20,
    },
    placeholder: emptyListHolder,
  },
}

addLibRenderer('viewUserInfoForm', (props: any) => {
  const schema = {
    type: 'form',
    wrapWithPanel: false,
    mode: 'horizontal',
    api: props.api,
    controls: [
      {
        name: 'id',
        label: '用户ID',
        type: 'tpl',
        tpl: `
          <span><%= data.id %></span> 
          <span class="badge badge-pill badge-info m-l-md">创建于: <%= data.created_time%></span>
        `,
      },
      {
        type: 'grid',
        mode: 'normal',
        columns: [
          {
            md: 6,
            mode: 'horizontal',
            horizontal: {
              left: 'col-md-6',
              right: 'col-md-6',
            },
            controls: [
              {
                name: 'real_name',
                label: '姓名',
                type: 'static',
              },
              {
                type: 'static',
                name: 'username',
                label: '登录账号',
              },
              {
                type: 'static',
                name: 'email',
                label: '邮箱',
              },
              {
                type: 'static',
                name: 'phone',
                label: '手机号',
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
                name: 'avatar',
                type: 'static-image',
                label: '头像',
                labelClassName: 'text-right',
              },
            ],
          },
        ],
      },
      {
        type: 'static',
        name: 'desc',
        label: '描述信息',
      },
    ],
  }

  return schema
})
