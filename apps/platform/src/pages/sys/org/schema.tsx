import { app } from '@core/app'

import { sysOrgApis } from './api'

const orgSchema = {
  type: 'page',
  bodyClassName: 'p-none',
  body: {
    type: 'tabs',
    mode: 'line',
    tabs: [
      {
        title: '组织列表',
        hash: 'orgList',
        body: {
          type: 'crud',
          name: 'orgList',
          filterTogglable: false,
          perPageAvailable: [20, 50, 150],
          defaultParams: {
            perPage: 20,
          },
          api: '$preset.apis.listOrg',
          headerToolbar: ['$preset.forms.filterOrg', '$preset.actions.addOrg'],
          footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
          columns: [
            {
              name: 'id',
              label: '组织ID',
              type: 'text',
              toggled: false,
            },
            {
              name: 'name',
              label: '名称',
              type: 'text',
            },
            {
              name: 'short_name',
              label: '简称',
              type: 'text',
            },
            {
              name: 'logo',
              label: 'LOGO',
              type: 'text',
            },
            {
              name: 'isolation',
              label: '类型',
              type: 'tpl',
              tpl: `
                <% if(data.leader) {%>
                  <span class="badge badge-primary">独立应用</span>
                <% } else { %>
                  <span class="badge badge-info">普通应用</span>
                <%  } %>
              `,
            },
            {
              name: 'desc',
              label: '描述',
              type: 'text',
              // eslint-disable-next-line
              tpl: '${desc|default:-|truncate:10}',
              popOver: {
                body: '$desc',
              },
            },
            {
              name: 'admin',
              label: '管理员',
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
              width: 120,
              buttons: [
                '$preset.actions.viewOrg',
                '$preset.actions.editOrg',
                '$preset.actions.delOrg',
              ],
            },
          ],
        },
      },
      {
        title: '审核组织申请',
        hash: 'orgApplyList',
        body: {
          type: 'crud',
          api: '$preset.apis.listOrgApply',
          filterTogglable: false,
          perPageAvailable: [20, 50, 150],
          defaultParams: {
            perPage: 20,
          },
          perPageField: 'size',
          pageField: 'page',
          headerToolbar: [],
          footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
          columns: [
            {
              name: 'id',
              label: 'ID',
              type: 'text',
              toggled: false,
            },
            {
              name: 'username',
              label: '登录账号',
              type: 'text',
            },
            {
              name: 'email',
              label: '邮箱',
              type: 'text',
            },
            {
              name: 'name',
              label: '组织名称',
              type: 'text',
            },
            {
              name: 'status',
              label: '处理状态',
              type: 'tpl',
              tpl: `
                <% if(data.status === '1') {%>
                  <span class="badge badge-pill badge-success">已发放</span>
                <% } else if (data.status === '2') { %>
                  <span class="badge badge-pill badge-danger">已拒绝</span>
                <% } else if (data.status === '3') { %>
                  <span class="badge badge-pill badge-primary">暂不处理</span>
                <%  } else { %>
                  <span class="badge badge-pill badge-secondary">未处理</span>
                <% } %>
              `,
            },
            {
              name: 'desc',
              label: '处理备注',
              type: 'text',
              // eslint-disable-next-line
              tpl: '${desc|default:-|truncate:10}',
              popOver: {
                body: '$desc',
              },
            },
            {
              name: 'created_time',
              label: '申请时间',
              type: 'datetime',
              width: 150,
            },
            {
              type: 'operation',
              label: '操作',
              width: 80,
              buttons: ['$preset.actions.checkOrgApply'],
            },
          ],
        },
      },
    ],
  },
  preset: {
    apis: sysOrgApis,
    actions: {
      addOrg: {
        type: 'action',
        align: 'right',
        label: '添加组织',
        level: 'primary',
        icon: 'iconfont icon-plus pull-left',
        actionType: 'dialog',
        showCloseButton: false,
        dialog: {
          title: '添加一个组织',
          actions: [],
          bodyClassName: 'p-none',
          body: '$preset.forms.addOrg',
        },
      },
      viewOrg: {
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
      editOrg: {
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
      delOrg: {
        type: 'action',
        label: '删除',
        className: 'text-danger',
        level: 'link',
        actionType: 'ajax',
        confirmText: '[删除确认] 确认要删除该用户: 【$real_name】 ?',
        api: '$preset.apis.delUser',
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
      addOrg: {
        type: 'wizard',
        className: 'm-none p-md',
        steps: [
          {
            title: '添加组织账号',
            mode: 'horizontal',
            controls: [
              {
                name: 'username',
                label: '登录账号',
                type: 'text',
                required: true,
              },
              {
                name: 'password',
                label: '登录密码',
                type: 'text',
                required: true,
              },
            ],
          },
          {
            title: '设置组织',
            mode: 'horizontal',
            api: '$preset.apis.addOrg',
            controls: [
              {
                name: 'title',
                label: '组织名称',
                type: 'text',
                required: true,
                validations: {
                  minLength: 2,
                },
              },
              {
                name: 'short_title',
                label: '组织简称',
                type: 'text',
                required: true,
                validations: {
                  minLength: 2,
                  maxLength: 8,
                },
              },
              {
                name: 'logo',
                label: '组织LOGO',
                type: 'image',
              },
              {
                name: 'isolation',
                label: '是否独立组织',
                type: 'switch',
                trueValue: '1',
                falseValue: '0',
                option: '设置为独立应用，将使用独立体系',
              },
              {
                name: 'sys_desc', // 用于平台使用的组织描述
                label: '组织描述',
                type: 'textarea',
              },
            ],
          },
          {
            title: '创建成功',
            controls: [
              {
                type: 'container',
                className: 'cxd-Alert cxd-Alert--info p-md d-block',
                body: [
                  {
                    type: 'tpl',
                    tpl: `<div style="font-size:14px;line-height:40px;  ">
                      已经成功创建组织
                      <span class="badge badge-success">$title</span> <br/>
                      可使用组织账号 <span class="badge badge-success">$username</span> 登录，进行管理该组织。<br/>
                    </div>`,
                  },
                ],
              },
            ],
            actions: [
              {
                type: 'action',
                label: '立即登录该组织',
                onAction: () => {
                  app.routerHistory.push(`/org/${sysOrgApis.store.addOrgId}/login`)
                },
              },
              {
                type: 'action',
                label: '关闭',
                level: 'primary',
                actionType: 'close',
                reload: true,
              },
            ],
          },
        ],
      },
      filterOrg: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        controls: [
          {
            type: 'text',
            name: 'q_id',
            placeholder: '请输入ID',
            target: 'orgList',
            addOn: {
              iconOnly: true,
              icon: 'iconfont icon-ai-search',
              type: 'submit',
            },
          },
        ],
      },
      checkOrgApply: {
        type: 'form',
        mode: 'horizontal',
        api: '$preset.apis.checkOrgApply',
        controls: [
          {
            name: 'status',
            label: '状态',
            type: 'list',
            required: true,
            value: '3',
            options: [
              {
                label: '已发放',
                value: '1',
              },
              {
                label: '已拒绝',
                value: '2',
              },
              {
                label: '暂不处理',
                value: '3',
              },
            ],
          },
          {
            name: 'desc',
            label: '处理备注',
            type: 'textarea',
            required: true,
            placeholder: '请输入处理备注',
            descriptionClassName: 'd-block',
            description: '每次处理申请，请务必备注清楚',
          },
        ],
      },
    },
  },
}

export default orgSchema