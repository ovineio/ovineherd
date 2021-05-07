import { getOrgId, isAppIsolation } from '~/core/common'
import { getLink, linkTo } from '~/core/utils'

import members from './members'

export const getSchema = () => {
  const orgId = getOrgId()
  const isolation = isAppIsolation(true)
  const hiddenOn = `${isolation}`
  const visibleOn = `${isolation}`

  const schema = {
    type: 'page',
    title: '应用角色管理',
    bodyClassName: 'p-t-none',
    body: {
      type: 'crud',
      name: 'roleList',
      $ref: 'globalCrudCommon',
      api: '$preset.apis.listRole',
      className: 'g-no-border-table',
      quickSaveItemApi: '$preset.apis.editRole',
      headerToolbar: [
        {
          $ref: 'globalTableReloadTool',
          target: 'roleList',
        },
        '$preset.forms.filterRole',
        '$preset.actions.roleManage',
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
          name: 'label',
          label: '角色名称',
          type: 'text',
        },
        {
          name: 'desc',
          label: '角色描述',
          // eslint-disable-next-line
          tpl: '${desc|default:-|truncate:40}',
          popOver: {
            body: '$desc',
          },
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
          buttons: [
            '$preset.actions.editRole',
            '$preset.actions.setLimit',
            '$preset.actions.delRole',
          ],
        },
      ],
    },
    preset: {
      actions: {
        roleMember: {
          visibleOn,
          type: 'action',
          align: 'right',
          label: '成员管理',
          level: 'primary',
          icon: 'fa fa-user pull-left',
          actionType: 'dialog',
          dialog: members,
        },
        addRole: {
          visibleOn,
          type: 'action',
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
          visibleOn,
          type: 'action',
          label: '编辑',
          level: 'link',
          actionType: 'dialog',
          dialog: {
            title: '编辑角色信息',
            body: {
              api: '$preset.apis.editRole',
              $preset: 'forms.updateRole',
            },
          },
        },
        delRole: {
          visibleOn,
          type: 'action',
          label: '删除',
          className: 'text-danger',
          level: 'link',
          actionType: 'ajax',
          confirmText: '[删除确认] 确认要删除该角色: 【$name】 ?',
          api: '$preset.apis.delRole',
        },
        setLimit: {
          limits: 'setLimit',
          type: 'lib-limit-setting',
          name: 'limit',
          api: '$preset.apis.setLimit',
          saveConfirmText: '您正在修改的角色是【$name】，提交后将不可重置，是否确认提交？',
          // useAllLimit: true,
          reload: true,
          button: {
            actionType: 'drawer',
            icon: undefined,
            level: 'link',
          },
          modal: {
            postion: 'right',
            resizable: true,
            className: 'hide-close-button',
          },
        },
        roleManage: {
          hiddenOn,
          type: 'button',
          level: 'primary',
          icon: 'iconfont icon-di pull-left',
          label: '设置组织角色',
          onAction: () => {
            linkTo(getLink('orgRole', orgId))
          },
        },
      },
      forms: {
        updateRole: {
          type: 'form',
          controls: [
            {
              type: 'text',
              name: 'label',
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
              hiddenOn,
              $ref: 'orgTeamIdPicker',
              name: 'q_relation3',
            },
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
        source: '$preset.apis.appRoleOption',
      },
    },
  }

  return schema
}
