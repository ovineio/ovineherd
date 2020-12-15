export const schema = {
  type: 'page',
  title: '应用成员管理',
  bodyClassName: 'p-t-none',
  body: {
    type: 'crud',
    name: 'userList',
    $ref: 'globalCrudCCommon',
    api: '$preset.apis.listUser',
    className: 'g-no-border-table',
    headerToolbar: [
      {
        $ref: 'globalTableReloadTool',
        target: 'userList',
      },
      '$preset.forms.filter',
      '$preset.actions.add',
    ],
    footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
    columns: [
      {
        name: 'id',
        label: '用户ID',
        type: 'text',
        toggled: false,
      },
      {
        name: 'real_name',
        label: '姓名',
        type: 'text',
      },
      {
        name: 'username',
        label: '登录账号',
        type: 'text',
      },
      {
        type: 'text',
        name: 'relation4_data.name',
        label: '角色名',
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'text',
      },
      {
        name: 'phone',
        label: '手机号',
        type: 'text',
      },
      {
        name: 'desc',
        label: '描述',
        type: 'tpl',
        // eslint-disable-next-line
        tpl: '${desc|default:-|truncate:10}',
        popOver: {
          body: '$desc',
        },
      },
      {
        name: 'created_time',
        label: '添加时间',
        type: 'text',
      },
      {
        type: 'operation',
        label: '操作',
        width: 120,
        buttons: [
          '$preset.actions.viewUser',
          '$preset.actions.editUser',
          '$preset.actions.delUser',
        ],
      },
    ],
  },
  definitions: {
    // orgTeamIdPicker: {
    //   type: 'select',
    //   clearable: true,
    //   multiple: true,
    //   label: '所属部门',
    //   placeholder: '请选择所属部门',
    //   searchPromptText: '输入部门ID/角色名',
    //   source: '$preset.apis.orgTeamOption',
    // },
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
  preset: {
    apis: {},
    actions: {
      add: {
        type: 'action',
        align: 'right',
        label: '添加成员',
        level: 'primary',
        icon: 'iconfont icon-plus pull-left',
        actionType: 'dialog',
        dialog: {
          title: '添加管理员',

          body: {
            api: '$preset.apis.addUser',
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
            api: '$preset.apis.viewUser',
            $preset: 'forms.viewUser',
          },
        },
      },
      editUser: {
        type: 'action',
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
        label: '删除',
        className: 'text-danger',
        level: 'link',
        actionType: 'ajax',
        confirmText: '[删除确认] 确认要删除该用户: 【$real_name】 ?',
        api: '$preset.apis.delUser',
      },
    },
    forms: {
      viewUser: {
        type: 'form',
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
          {
            type: 'divider',
          },
        ],
      },
      updateUser: {
        type: 'form',
        controls: [
          {
            type: 'text',
            name: 'username',
            label: '登录账号',
            required: true,
            disabledOn: 'typeof data.id !== "undefined"',
          },
          {
            type: 'text',
            name: 'password',
            label: '登录密码',
            requiredOn: 'typeof data.id === "undefined"',
          },
          {
            type: 'text',
            name: 'real_name',
            label: '姓名',
            required: true,
          },
          {
            $ref: 'orgRoleIdPicker',
            required: true,
            multiple: false,
            name: 'relation4',
            label: '设置角色',
          },
          {
            type: 'email',
            name: 'email',
            label: '邮箱',
          },
          {
            type: 'text',
            name: 'phone',
            label: '手机号',
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
          },
        ],
      },
      filter: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        target: 'userList',
        controls: [
          {
            $ref: 'orgRoleIdPicker',
            name: 'q_relation4',
          },
          {
            type: 'text',
            name: 'n_username',
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
