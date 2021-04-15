import React from 'react'

import { getUrlParams } from '@core/utils/tool'

import { emptyListHolder } from '~/core/constants'

let tableRef: any = {}

export const getTableRef = (ref) => {
  tableRef = ref
}

const changeTableTeam = (teamId: string) => {
  tableRef.getComponentByName('userList').handleFilterSubmit({ q_relation3: teamId })
}

export const treeSchema = {
  type: 'form',
  wrapWithPanel: false,
  target: 'userList',
  controls: [
    {
      type: 'tree',
      name: 'relation3',
      className: 'team-tree',
      rootCreatable: false,
      showIcon: false,
      initiallyOpen: true,
      creatable: true,
      editable: true,
      removable: true,
      unfoldedLevel: 1,
      valueField: 'id',
      // eslint-disable-next-line
      placeholder: <div dangerouslySetInnerHTML={{ __html: emptyListHolder }} />,
      addApi: '$preset.apis.addTreeNode',
      editApi: '$preset.apis.editTreeNode',
      deleteApi: '$preset.apis.delTreeNode',
      source: '$preset.apis.teamTreeInfo',
      onChange: (nodeId: string) => {
        changeTableTeam(nodeId)
      },
    },
  ],
}

export const tableSchema = {
  type: 'crud',
  $ref: 'globalCrudCommon',
  name: 'userList',
  headerToolbar: [
    {
      type: 'button',
      icon: 'fa fa-refresh',
      tooltip: '刷新数据',
      actionType: 'reload',
      onAction: () => {
        changeTableTeam('')
      },
    },
    '$preset.forms.filter',
    '$preset.actions.add',
  ],
  footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
  api: '$preset.apis.listUser',
  columns: [
    {
      name: 'id',
      label: '用户ID',
      type: 'text',
      toggled: false,
    },
    {
      name: 'username',
      label: '登录账号',
      type: 'text',
    },
    {
      name: 'real_name',
      label: '姓名',
      type: 'text',
    },
    // {
    //   name: 'leader',
    //   label: '管理员',
    //   type: 'tpl',
    //   tpl: `
    //   <% if(data.leader === '1') {%>
    //     <span class="badge badge-pill badge-success">是</span>
    //   <% } else { %>
    //     <span class="badge badge-pill badge-secondary">否</span>
    //   <%  } %>
    // `,
    // },
    {
      name: 'team.label',
      label: '所属部门',
      type: 'text',
    },
    {
      name: 'relation4_data.name',
      label: '权限角色',
      type: 'tpl',
      tpl: `<% if (data.relation4_data) { %>
        <%= data.relation4_data.name %>
      <% } else { %>
        <span class="text-danger" data-tooltip="该账号未设置角色无法登录，设置角色后可正常使用">暂无角色<i class="fa fa-question-circle-o p-l-xs"></i></span>
      <% } %>
      `,
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
      width: 110,
      visibleOn: 'this.editUser || this.delUser',
      buttons: ['$preset.actions.viewUser', '$preset.actions.editUser', '$preset.actions.delUser'],
    },
  ],
  preset: {
    actions: {
      add: {
        type: 'action',
        visibleOn: 'this.addUser',
        align: 'right',
        label: '添加管理员',
        level: 'primary',
        icon: 'iconfont icon-plus pull-left',
        actionType: 'dialog',
        dialog: {
          title: '添加管理员',
          body: {
            api: '$preset.apis.addUser',
            initApi: {
              url: 'fakeUserInfo',
              onFakeRequest: () => {
                return {
                  status: 0,
                  data: {
                    relation3: getUrlParams('q_relation3') || '',
                  },
                }
              },
            },
            $preset: 'forms.updateUser',
          },
        },
      },
      viewUser: {
        type: 'action',
        label: '查看',
        level: 'link',
        actionType: 'dialog',
        dialog: {
          title: '管理员详细资料',
          actions: [],
          closeOnEsc: true,
          body: {
            type: 'lib-renderer',
            renderer: 'viewUserInfoForm',
          },
        },
      },
      editUser: {
        type: 'action',
        visibleOn: 'this.editUser',
        label: '编辑',
        level: 'link',
        actionType: 'dialog',
        dialog: {
          title: '编辑管理员',
          body: {
            api: '$preset.apis.editUser',
            $preset: 'forms.updateUser',
          },
        },
      },
      delUser: {
        type: 'action',
        visibleOn: 'this.delUser',
        label: '删除',
        className: 'text-danger',
        level: 'link',
        actionType: 'ajax',
        confirmText: '[删除确认] 确认要删除该用户: 【$real_name】 ?',
        hiddenOn: 'data.is_root === "1"',
        api: '$preset.apis.delUser',
      },
    },
    forms: {
      updateUser: {
        type: 'form',
        controls: [
          {
            type: 'text',
            name: 'username',
            label: '登录账号',
            required: true,
            disabledOn: 'typeof data.id !== "undefined"',
            placeholder: '请输入登录账号',
          },
          {
            type: 'text',
            name: 'password',
            label: '登录密码',
            requiredOn: 'typeof data.id === "undefined"',
            placeholder: '请输入登录密码，编辑时为修改密码',
          },
          {
            type: 'text',
            name: 'real_name',
            label: '姓名',
            required: true,
            placeholder: '请输入登录姓名',
          },
          {
            type: 'tree-select',
            name: 'relation3',
            label: '所属部门',
            required: true,
            showIcon: false,
            valueField: 'id',
            placeholder: '请选择所属部门',
            source: '$preset.apis.teamTreeInfo',
          },
          {
            name: 'leader',
            label: '是否为管理员',
            hiddenOn: 'data.is_root==="1"',
            $ref: 'globalSwitch',
          },
          {
            type: 'email',
            name: 'email',
            label: '邮箱',
            placeholder: '请输入邮箱',
          },
          {
            type: 'text',
            name: 'phone',
            label: '手机号',
            placeholder: '请输入手机号',
            validations: {
              isNumeric: true,
            },
            validationErrors: {
              isNumeric: '手机号格式不正确',
            },
          },
          {
            type: 'textarea',
            name: 'desc',
            label: '描述',
            placeholder: '请输入描述',
          },
        ],
      },
      filter: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        target: 'userList',
        name: 'userListFilter',
        controls: [
          {
            type: 'hidden',
            name: 'q_relation3',
            submitOnChange: true,
            label: '所属部门',
          },
          {
            type: 'text',
            name: 'q_username',
            placeholder: '请输入登录账号搜索',
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
