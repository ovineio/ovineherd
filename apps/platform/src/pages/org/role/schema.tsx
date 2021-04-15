import members from './members'
import { limitSetting } from './tpl'

export const orgRoleSchema = {
  type: 'page',
  bodyClassName: 'p-none',
  body: {
    type: 'tabs',
    mode: 'line',
    tabs: [
      {
        title: '角色列表',
        hash: 'roleList',
        body: {
          type: 'crud',
          $ref: 'globalCrudCommon',
          api: '$preset.apis.listRole',
          name: 'roleList',
          quickSaveItemApi: '$preset.apis.editRole',
          headerToolbar: [
            {
              $ref: 'globalTableReloadTool',
              target: 'roleList',
            },
            '$preset.forms.filterRole',
            '$preset.actions.addRole',
            '$preset.actions.roleMember',
          ],
          footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
          columnsTogglable: true,
          columns: [
            {
              name: 'id',
              label: '权限ID',
              type: 'text',
              toggled: false,
            },
            {
              name: 'name',
              label: '角色名称',
              type: 'text',
              // quickEdit: {
              //   type: 'textarea',
              //   placeholder: '修改角色名称',
              //   saveImmediately: true,
              // },
            },
            {
              name: 'desc',
              label: '角色描述',
              // eslint-disable-next-line
              tpl: '${desc|default:-|truncate:40}',
              popOver: {
                body: '$desc',
              },
              // quickEdit: {
              //   type: 'textarea',
              //   placeholder: '修改角色描述',
              //   saveImmediately: true,
              // },
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
              width: 150,
              editRole: 'this.editRole || this.setLimit || this.delRole',
              buttons: [
                '$preset.actions.editRole',
                '$preset.actions.setLimit',
                '$preset.actions.delRole',
              ],
            },
          ],
        },
      },
    ],
  },
  preset: {
    actions: {
      roleMember: {
        visibleOn: 'this.roleMember',
        type: 'action',
        align: 'right',
        label: '成员管理',
        level: 'primary',
        icon: 'fa fa-user pull-left',
        actionType: 'dialog',
        dialog: members,
      },
      addRole: {
        type: 'action',
        visibleOn: 'this.addRole',
        align: 'right',
        label: '添加角色',
        level: 'primary',
        icon: 'fa fa-plus pull-left',
        actionType: 'dialog',
        dialog: {
          title: '添加角色',
          body: {
            api: '$preset.apis.addRole',
            $preset: 'forms.updateRole',
          },
        },
      },
      editRole: {
        type: 'action',
        visibleOn: 'this.editRole',
        label: '编辑',
        level: 'link',
        actionType: 'dialog',
        disabledOn: 'this.is_root',
        dialog: {
          title: '编辑角色信息',
          body: {
            api: '$preset.apis.editRole',
            $preset: 'forms.updateRole',
          },
        },
      },
      setLimit: {
        type: 'action',
        visibleOn: 'this.setLimit',
        label: '设置权限',
        level: 'link',
        disabledOn: 'this.is_root',
        actionType: 'dialog',
        dialog: {
          size: 'lg',
          title: '设置 【$name】 权限',
          body: limitSetting,
        },
      },
      delRole: {
        type: 'action',
        visibleOn: 'this.delRole',
        label: '删除',
        className: 'text-danger',
        disabledOn: 'this.is_root',
        level: 'link',
        actionType: 'ajax',
        confirmText: '[删除确认] 确认要删除该角色: 【$name】 ?',
        api: '$preset.apis.delRole',
      },
    },
    forms: {
      updateRole: {
        type: 'form',
        controls: [
          {
            type: 'text',
            name: 'name',
            label: '角色名称',
            required: true,
            placeholder: '请输入角色名称',
          },
          {
            type: 'textarea',
            name: 'desc',
            label: '角色描述',
            placeholder: '请输入角色描述',
          },
        ],
      },
      filterRole: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        target: 'roleList',
        controls: [
          {
            type: 'text',
            name: 'n_name',
            placeholder: '请输入角色名搜索',
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
  definitions: {
    orgTeamIdPicker: {
      type: 'select',
      clearable: true,
      multiple: true,
      label: '所属部门',
      placeholder: '请选择所属部门',
      searchPromptText: '输入部门ID/角色名',
      source: '$preset.apis.orgTeamOption',
    },
    orgRoleIdPicker: {
      type: 'select',
      clearable: true,
      multiple: true,
      label: '角色名',
      placeholder: '请选择角色',
      searchPromptText: '输入角色ID/角色名',
      source: '$preset.apis.orgRoleOption',
    },
  },
}
