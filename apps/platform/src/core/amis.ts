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

// addLibRenderer('sysUserInfoModal', ({ userIdKey = 'id', data = {} }) => {

// })
