export const limitSetting: any = {
  type: 'lib-css',
  body: {
    type: 'form',
    mode: 'normal',
    wrapWithPanel: false,
    api: '$preset.apis.setLimit',
    initApi: '$preset.apis.getLimit',
    initFetchOn: 'data.relation2',
    controls: [
      { type: 'hidden', name: 'id' },
      { type: 'hidden', name: 'relation2' },
      {
        type: 'checkboxes',
        name: 'orgTeam',
        label: '团队管理',
        multiple: true,
        checkAll: true,
        options: [
          {
            label: '查看团队',
            value: 'viewTeam',
          },
          {
            label: '新建成员',
            value: 'addUser',
          },
          {
            label: '编辑成员',
            value: 'editUser',
          },

          {
            label: '修改组织结构',
            value: 'editTeam',
          },
          {
            label: '删除成员',
            value: 'delUser',
          },
        ],
      },
      {
        type: 'checkboxes',
        name: 'orgRole',
        label: '角色管理',
        checkAll: true,
        multiple: true,
        options: [
          {
            label: '查看角色',
            value: 'viewRole',
          },
          {
            label: '新建角色',
            value: 'addRole',
          },
          {
            label: '编辑角色',
            value: 'editRole',
          },
          {
            label: '成员管理',
            value: 'editMember',
          },
          {
            label: '设置权限',
            value: 'editLimit',
          },
          {
            label: '删除角色',
            value: 'delRole',
          },
        ],
      },
      {
        type: 'checkboxes',
        name: 'orgSetting',
        label: '设置管理',
        checkAll: true,
        multiple: true,
        options: [
          {
            label: '设置组织信息',
            value: 'editOrg',
          },
          {
            label: '设置登录页面',
            value: 'editLogin',
          },
        ],
      },
      {
        type: 'checkboxes',
        name: 'orgApp',
        label: '应用管理',
        labelRemark: '此处设置对每一个应用有效',
        checkAll: true,
        multiple: true,
        options: [
          {
            label: '登录应用',
            value: 'loginApp',
          },
          {
            label: '新建应用',
            value: 'addApp',
          },
          {
            label: '修改信息',
            value: 'editApp',
          },
          {
            label: '设计应用',
            value: 'designApp',
          },
          {
            label: '删除应用',
            value: 'delApp',
          },
        ],
      },
      {
        type: 'divider',
      },
      {
        type: 'combo',
        name: 'appLimit',
        label: '单个应用权限设置',
        addButtonText: '添加单个应用权限',
        labelRemark: '仅对所设置的单个应用有效',
        draggable: true,
        noBorder: true,
        addable: true,
        removable: true,
        multiple: true,
        placeholder: ' ',
        labelClassName: 'm-b-md',
        controls: [
          {
            name: 'id',
            type: 'select',
            source: '$preset.apis.appListOpts',
            columnClassName: 'cxd-Grid-col--md3',
            unique: true,
            required: true,
            placeholder: '选择应用',
          },
          {
            type: 'checkbox',
            name: 'ignore',
            label: '剔除此应用权限',
            mode: 'inline',
            hiddenOn: '!!this.limit',
          },
          {
            type: 'checkboxes',
            name: 'limit',
            mode: 'inline',
            checkAll: true,
            multiple: true,
            required: true,
            hiddenOn: '!!this.ignore',
            options: [
              {
                label: '登录应用',
                value: 'loginApp',
              },
              {
                label: '修改信息',
                value: 'editApp',
              },
              {
                label: '设计应用',
                value: 'designApp',
              },
              {
                label: '删除应用',
                value: 'delApp',
              },
            ],
          },
        ],
      },
    ],
  },
  css: `
    .cxd-Form-label,.cxd-Collapse-header {
      display: block;
      font-size: 14px;
      color: #444;
    }
    .cxd-Collapse-header {
      margin-left: -20px;
    }
    .cxd-CheckboxesControl{
      .cxd-Checkbox--checkbox {
        display: inline-block;
        width: 110px;
        margin-right: 0;
        margin-bottom: 0;
        span {
          white-space: nowrap;
        }
      }
    }
    .cxd-TreeControl {
      border: 0;
      padding: 0;
    }
  `,
}
