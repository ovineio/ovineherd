/* eslint-disable no-template-curly-in-string */
const members = {
  title: '角色成员管理',
  size: 'lg',
  actions: [],
  data: {
    id: '',
  },
  body: {
    type: 'lib-crud',
    name: 'memberList',
    api: '$preset.apis.listMember',
    $ref: 'globalCrudCCommon',
    filterTogglable: false,
    affixHeader: false,
    syncLocation: false,
    forceReload: true,
    headerToolbar: [
      {
        $ref: 'globalTableReloadTool',
        target: 'memberList',
      },
      {
        type: 'bulkActions',
        align: 'left',
      },
    ],
    footerToolbar: [
      {
        type: 'tpl',
        tpl: '当前有 ${count|default:0} 位成员',
        className: 'v-middle',
      },
      'pagination',
    ],
    filter: {
      className: 'm-b-sm',
      controls: [
        {
          $ref: 'orgTeamIdPicker',
          name: 'teamIds',
        },
        {
          $ref: 'orgRoleIdPicker',
          name: 'roleIds',
        },
        {
          type: 'text',
          name: 'q_real_name',
          placeholder: '请输入用户姓名',
          clearable: true,
          label: '用户姓名',
          addOn: {
            iconOnly: true,
            icon: 'iconfont icon-ai-search',
            type: 'submit',
          },
        },
      ],
    },
    bulkActions: [
      {
        limits: 'editLimit',
        label: '批量变更角色',
        icon: 'fa fa-gavel pull-left',
        primary: true,
        actionType: 'dialog',
        dialog: {
          title: '批量成员变更角色',
          body: {
            type: 'form',
            api: '$preset.apis.batchSetRole',
            controls: [
              {
                type: 'hidden',
                name: 'ids',
              },
              {
                $ref: 'orgRoleIdPicker',
                required: true,
                multiple: false,
                name: 'newRoleId',
                label: '变更角色',
              },
              {
                type: 'tpl',
                label: '已选成员',
                inputClassName: 'container',
                tpl: `
                  <div class="row">
                    <% for(var i=0; i < data.items.length; i++) { var item=data.items[i]; %>
                      <div class="col-sm-6 m-b-xs"><%= item.real_name %> (<%= item.role.name || '无角色' %>)</div>
                    <% } %>
                  </div>
                `,
              },
              {
                type: 'checkbox',
                name: 'confirmAction',
                label: '确认操作',
                option: '请谨慎操作，必须确认后才可提交。',
              },
            ],
          },
          actions: [
            {
              label: '取消',
              actionType: 'close',
              type: 'button',
            },
            {
              label: '确认',
              actionType: 'confirm',
              type: 'button',
              level: 'primary',
              disabledOn: '!data.confirmAction',
            },
          ],
        },
      },
    ],
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
        sortable: true,
      },
      // {
      //   name: 'avatar',
      //   label: '头像',
      //   type: 'image',
      //   $ref: 'globalImageCell',
      // },
      {
        name: 'role.name',
        label: '角色名称',
        type: 'text',
      },
      {
        name: 'team.label',
        label: '所属部门',
        type: 'text',
      },
      {
        name: 'desc',
        label: '角色描述',
        // eslint-disable-next-line
        tpl: '${desc|default:-|truncate:10}',
        popOver: {
          body: '$desc',
        },
      },
      {
        name: 'created_time',
        label: '创建时间',
        type: 'datetime',
        width: 150,
      },
      {
        type: 'operation',
        label: '操作',
        width: 120,
        buttons: [
          {
            type: 'action',
            label: '移除角色',
            disabledOn: '!role.name',
            level: 'link',
            className: 'text-danger',
            actionType: 'ajax',
            confirmText:
              '[删除移除] 确认要将用户【$real_name】 从【$role.name】角色中移除? 移除后该用户将无法正常登陆本系统。',
            api: '$preset.apis.rmUserRole',
          },
        ],
      },
    ],
  },
}

export default members
