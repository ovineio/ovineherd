import adminPageApi from './api'

export const schema = {
  type: 'page',
  title: '应用发布管理',
  css: `
    .cxd-Table {
      border: 0;
    }
  `,
  bodyClassName: 'p-t-none',
  body: {
    type: 'crud',
    toolbarClassName: 'p-l-none p-r-none padder-v-md',
    name: 'pageList',
    $ref: 'globalCrudCCommon',
    // api: '$preset.apis.listNav',
    headerToolbar: [
      {
        $ref: 'globalTableReloadTool',
        target: 'pageList',
      },
      '$preset.forms.filterNav',
      '$preset.actions.addNav',
    ],
    footerToolbar: [],
    columns: [
      {
        name: 'version',
        label: '版本号',
        type: 'text',
      },
      // {
      //   name: 'type',
      //   label: '类型',
      //   type: 'text',
      // },
      {
        name: 'desc',
        label: '备注信息',
        remark: '对该版本的备注信息',
        type: 'text',
        // eslint-disable-next-line
        tpl: '${desc|default:-|truncate:10}',
        popOver: {
          body: '$desc',
        },
      },

      {
        name: 'created_time',
        label: '发布时间',
        type: 'datetime',
        width: 150,
      },
      {
        name: 'user.username',
        label: '发布人',
        type: 'text',
      },
      {
        type: 'operation',
        label: '操作',
        width: 170,
        buttons: [
          '$preset.actions.editNav',
          '$preset.actions.designPage',
          '$preset.actions.delNav',
        ],
      },
    ],
  },
  preset: {
    apis: adminPageApi,
    actions: {
      addNav: {
        type: 'action',
        align: 'right',
        label: '添加新页面',
        level: 'primary',
        icon: 'iconfont icon-plus pull-left',
        actionType: 'dialog',
        showCloseButton: false,
        dialog: {
          title: '添加新页面',
          body: {
            api: '$preset.apis.addNav',
            $preset: 'forms.addNav',
          },
        },
      },
      editNav: {
        type: 'action',
        label: '编辑',
        level: 'link',
        actionType: 'dialog',
        dialog: {
          title: '修改页面信息',
          body: {
            api: '$preset.apis.editNav',
            $preset: 'forms.addNav',
          },
        },
      },
      designPage: {
        type: 'action',
        label: '设计页面',
        level: 'link',
      },
      delNav: {
        type: 'action',
        label: '删除',
        className: 'text-danger',
        level: 'link',
        actionType: 'ajax',
        confirmText:
          // eslint-disable-next-line
          '[删除确认] 确认该页面: 【${label|default:-}】，组织页面后将不可恢复，请谨慎操作～',
        api: '$preset.apis.delNav',
      },
      checkOrgApply: {
        type: 'action',
        label: '处理',
        level: 'link',
        actionType: 'dialog',
        dialog: {
          title: '处理组织申请',
          body: '$preset.forms.checkOrgApply',
        },
      },
    },
    forms: {
      addNav: {
        type: 'form',
        controls: [
          {
            name: 'label',
            type: 'text',
            label: '菜单名称',
            required: true,
            desc: '该页面对应菜单的展示名称',
          },
          {
            name: 'desc',
            label: '备注信息',
            type: 'textarea',
          },
          {
            name: 'side_visible',
            label: '是否菜单可见',
            ref: 'globalSwitch',
            type: 'switch',
            value: '1',
          },
          {
            type: 'tree-select',
            name: 'parent_id',
            clearable: true,
            multiple: false,
            valueField: 'id',
            showIcon: false,
            label: '父级页面',
            placeholder: '请选择父级页面',
            value: '0',
            source: '$preset.apis.navParent',
          },
        ],
      },
      editNav: {
        type: 'form',
        mode: 'horizontal',
        controls: [
          {
            name: 'name',
            label: '组织名称',
            type: 'text',
            placeholder: '请输入组织名称',
            required: true,
            validations: {
              minLength: 2,
            },
          },
          {
            name: 'logo',
            label: '组织LOGO',
            type: 'image',
            $ref: 'globalImgUpload',
          },
          {
            name: 'sys_desc', // 用于平台使用的组织描述
            label: '备注信息',
            placeholder: '请输入备注信息',
            type: 'textarea',
          },
        ],
      },
      filterNav: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        target: 'orgList',
        controls: [
          {
            type: 'text',
            name: 'n_label',
            placeholder: '请输入页面名称',
            clearable: true,
            addOn: {
              iconOnly: true,
              icon: 'iconfont icon-ai-search',
              type: 'submit',
            },
          },
        ],
      },
    },
  },
}
