import React from 'react'
import { Link } from 'react-router-dom'

import { app } from '@core/app'

import { getLink } from '~/core/utils'

import { getCacheStore } from './api'

const ToOrgLogin = (props) => {
  const { user = {}, id } = props.data
  return (
    <Link to={`${getLink('login', id)}?username=${user.username}`} title="点击进入组织后台">
      登录组织
    </Link>
  )
}

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
          $ref: 'globalCrudCommon',
          api: '$preset.apis.listOrg',
          headerToolbar: [
            {
              $ref: 'globalTableReloadTool',
              target: 'orgList',
            },
            '$preset.forms.filterOrg',
            '$preset.actions.addOrg',
          ],
          footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
          columns: [
            {
              name: 'id',
              label: '组织ID',
              type: 'text',
              toggled: false,
            },
            {
              name: 'config.name',
              label: '组织名称',
              type: 'text',
            },
            {
              name: 'config.logo',
              label: '组织LOGO',
              type: 'image',
              $ref: 'globalImageCell',
            },
            {
              name: 'isolation',
              label: '类型',
              type: 'tpl',
              tpl: `
                <% if(data.isolation === '1') {%>
                  <span class="badge badge-pill badge-primary">独立组织</span>
                <% } else { %>
                  <span class="badge badge-pill badge-info">普通组织</span>
                <%  } %>
              `,
            },
            {
              name: 'config.sys_desc',
              label: '备注信息',
              remark: '对该组织备注信息',
              type: 'text',
              // eslint-disable-next-line
              tpl: '${config.sys_desc|default:-|truncate:10}',
              popOver: {
                body: '$config.sys_desc',
              },
            },
            {
              name: 'user.username',
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
              width: 170,
              buttons: [
                '$preset.actions.viewOrg',
                '$preset.actions.loginOrg',
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
          $ref: 'globalCrudCommon',
          api: '$preset.apis.listOrgApply',
          hash: 'orgApplyList',
          name: 'orgApplyList',
          headerToolbar: [
            {
              $ref: 'globalTableReloadTool',
              target: 'orgApplyList',
            },
          ],
          footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
          columns: [
            {
              name: 'id',
              label: 'ID',
              type: 'text',
              toggled: false,
            },
            {
              name: 'created_time',
              label: '申请时间',
              type: 'datetime',
              width: 150,
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
              label: '处理备注信息',
              type: 'text',
              // eslint-disable-next-line
              tpl: '${desc|default:-|truncate:10}',
              popOver: {
                body: '$desc',
              },
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
      loginOrg: {
        type: 'container',
        className: 'cxd-Button cxd-Button--link cxd-Button--sm',
        body: {
          component: ToOrgLogin,
        },
      },
      viewOrg: {
        type: 'action',
        label: '查看',
        level: 'link',
        actionType: 'dialog',
        dialog: {
          title: '组织详细资料',
          actions: [],
          closeOnEsc: true,
          bodyClassName: 'p-t-none',
          body: {
            api: '$preset.apis.viewOrg',
            $preset: 'forms.viewOrg',
          },
        },
      },
      editOrg: {
        type: 'action',
        label: '编辑',
        level: 'link',
        actionType: 'dialog',
        dialog: {
          title: '编辑组织',
          data: {
            '&': '${config}',
            user_id: '${user.id}',
            username: '${user.username}',
          },
          body: {
            api: '$preset.apis.editOrg',
            $preset: 'forms.editOrg',
          },
        },
      },
      delOrg: {
        type: 'action',
        label: '删除',
        className: 'text-danger',
        level: 'link',
        actionType: 'ajax',
        confirmText:
          // eslint-disable-next-line
          '[删除确认] 确认要删除该组织: 【${config.name|default:-}】，组织删除后将不可恢复，请谨慎操作～',
        api: '$preset.apis.delOrg',
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
                name: 'name',
                label: '组织名称',
                type: 'text',
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
                $ref: 'globalSwitch',
                name: 'isolation',
                label: '是否独立',
                option: '设置为独立组织，将使用独立组织体系',
              },
              {
                name: 'sys_desc', // 用于平台使用的组织描述
                label: '备注信息',
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
                  app.routerHistory.push(`/org/${getCacheStore().addOrgId}/login`)
                },
              },
              {
                type: 'action',
                label: '关闭',
                level: 'primary',
                actionType: 'close',
                reload: 'orgList',
              },
            ],
          },
        ],
      },
      editOrg: {
        type: 'form',
        mode: 'horizontal',
        controls: [
          {
            name: 'user_id',
            type: 'hidden',
          },
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
            name: 'username',
            label: '组织管理员账号',
            type: 'text',
            required: true,
            disabled: true,
          },
          {
            name: 'password',
            label: '组织管理员密码',
            type: 'text',
            placeholder: '修改组织管理员登陆密码',
            validations: {
              minLength: 4,
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
      viewOrg: {
        type: 'form',
        horizontal: {
          left: 'col-md-2',
          right: 'col-md-10',
        },
        controls: [
          {
            type: 'tpl',
            tpl: `
              <h6 class="cxd-section-header m-t-md m-b-md" style="margin-left: -20px;">组织信息</h6>
            `,
          },
          {
            name: 'id',
            label: '组织ID',
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
                  left: 'col-md-4',
                  right: 'col-md-8',
                },
                controls: [
                  {
                    name: 'config.name',
                    label: '组织名称',
                    type: 'static',
                  },
                  {
                    name: 'config.slogan',
                    label: '组织标语',
                    type: 'static',
                  },
                  {
                    name: 'config.title',
                    label: '导航标题',
                    type: 'static',
                  },
                  {
                    name: 'config.desc',
                    label: '组织介绍',
                    type: 'static',
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
                    name: 'config.logo',
                    type: 'static-image',
                    label: 'LOGO',
                    labelClassName: 'text-right',
                  },
                ],
              },
            ],
          },
          {
            type: 'divider',
          },
          {
            type: 'tpl',
            tpl: `
              <h6 class="cxd-section-header m-t-md m-b-md" style="margin-left: -20px;">管理员信息</h6>
              `,
          },
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
                  left: 'col-md-4',
                  right: 'col-md-8',
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
        ],
      },
      filterOrg: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        target: 'orgList',
        controls: [
          {
            type: 'text',
            name: 'n_name',
            placeholder: '请输入 组织名称',
            clearable: true,
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
            descriptionClassName: 'd-block',
            description: '所有的操作，均由手动处理，此处只是用作记录',
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
            label: '处理备注信息',
            type: 'textarea',
            required: true,
            placeholder: '请输入处理备注信息',
            descriptionClassName: 'd-block',
            description: '每次处理申请，请务必备注信息清楚',
          },
        ],
      },
    },
  },
}

export default orgSchema
