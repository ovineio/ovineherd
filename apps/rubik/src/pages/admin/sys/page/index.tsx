import { app } from '@ovine/core/lib/app'
import adminPageApi from './api'
import AppPageCss from './styled'

export const schema = {
  css: AppPageCss,
  type: 'page',
  title: '应用页面管理',
  bodyClassName: 'p-t-none',
  body: {
    type: 'crud',
    name: 'pageList',
    $ref: 'globalCrudCCommon',
    api: '$preset.apis.listNav',
    className: 'g-no-border-table',
    headerToolbar: [
      {
        $ref: 'globalTableReloadTool',
        target: 'pageList',
      },
      '$preset.forms.filterNav',
      '$preset.actions.addNav',
    ],
    footerToolbar: [],
    footable: {
      expand: 'all',
    },
    columns: [
      {
        name: 'label',
        label: '名称',
        type: 'text',
        remark: '该页面对应菜单的展示名称',
      },
      {
        name: 'page_type',
        label: '类型',
        type: 'tpl',
        tpl: `
          <% if(data.page_type === '2') {%>
            文件夹
          <% } else { %>
            普通页面
          <%  } %>
          <% if(data.side_visible !== '1') { %>
            <i class="fa fa-eye-slash cursor-p m-l-sm" data-tooltip="侧边栏菜单不可见" />
          <% } %>
        `,
      },
      {
        name: 'desc',
        label: '备注信息',
        remark: '对该页面备注信息',
        type: 'text',
        // eslint-disable-next-line
        tpl: '${desc|default:-|truncate:10}',
        popOver: {
          body: '$desc',
        },
      },
      {
        name: 'user.username',
        label: '创建者',
        type: 'text',
      },
      {
        name: 'created_time',
        label: '添加时间',
        type: 'datetime',
        width: 150,
      },
      {
        type: 'operation',
        label: '操作',
        width: 200,
        buttons: [
          '$preset.actions.editNav',
          '$preset.actions.editLimit',
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
            $preset: 'forms.updateNav',
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
            $preset: 'forms.updateNav',
          },
        },
      },
      designPage: {
        type: 'action',
        label: '设计页面',
        level: 'link',
        hiddenOn: 'data.page_type === "2"',
        actionType: 'link',
        link: '/admin/sys/design/$page_id?label=$label',
      },
      editLimit: {
        type: 'action',
        label: '编辑权限',
        hiddenOn: 'data.page_type === "2"',
        level: 'link',
        actionType: 'dialog',
        dialog: {
          title: '修改页面信息',
          body: {
            api: '$preset.apis.editNav',
            $preset: 'forms.updateNav',
          },
        },
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
    },
    forms: {
      updateNav: {
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
            type: 'button-group',
            name: 'page_type',
            label: '页面类型',
            value: '1',
            options: [
              {
                label: '普通页面',
                value: '1',
              },
              {
                label: '文件夹',
                value: '2',
              },
            ],
          },
          {
            type: 'app-icon-selector',
            label: '选择图标',
            placeholder: '请输入图标',
            clearable: true,
            size: 'md',
            name: 'icon',
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
            name: 'is_home',
            label: '设为首页',
            ref: 'globalSwitch',
            type: 'switch',
            value: '0',
            option: '设置该页面为首页，将取消原首页',
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

      filterNav: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        target: 'pageList',
        className: 'filter-form',
        controls: [
          {
            type: 'action',
            icon: 'fa fa-search',
            iconOnly: true,
          },
          {
            type: 'tree-select',
            name: 'n_page_id',
            clearable: true,
            multiple: false,
            showIcon: false,
            searchable: true,
            submitOnChange: true,
            valueField: 'id',
            placeholder: '搜索页面',
            source: '$preset.apis.navParent',
          },
        ],
      },
    },
  },
}
