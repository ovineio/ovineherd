import { app } from '@core/app'

import { getApiOption } from '~/core/api'
import { relation } from '~/core/constants'

const store = {
  addOrgId: '',
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
        body: {
          type: 'crud',
          filterTogglable: false,
          perPageAvailable: [50, 100, 200],
          defaultParams: {
            size: 50,
          },
          api: '$preset.apis.listOrg',
          headerToolbar: ['$preset.forms.filter', '$preset.actions.addOrg'],
          footerToolbar: ['statistics', 'switch-per-page', 'pagination'],
          columns: [
            {
              name: 'id',
              label: 'ID',
              type: 'text',
              width: 40,
            },
            {
              name: 'title',
              label: '名称',
              type: 'text',
            },
            {
              name: 'short_title',
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
              label: '独立',
              type: 'text',
            },
            {
              name: 'desc',
              label: '描述',
              type: 'text',
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
              width: 80,
              buttons: ['$preset.actions.edit', '$preset.actions.member', '$preset.actions.remove'],
            },
          ],
        },
      },
      {
        title: '审核组织申请',
        body: {
          type: 'crud',
          data: {
            items: [
              {
                id: 123,
              },
            ],
          },
          filterTogglable: false,
          perPageAvailable: [50, 100, 200],
          defaultParams: {
            size: 50,
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
              width: 40,
            },
            {
              name: 'name',
              label: '姓名',
              type: 'text',
            },
            {
              name: 'email',
              label: '邮箱',
              type: 'text',
            },
            {
              name: 'leader',
              label: '管理员',
              type: 'text',
            },
            {
              name: 'department',
              label: '所属部门',
              type: 'text',
            },
            {
              name: 'desc',
              label: '成员描述',
              type: 'text',
            },
            {
              name: 'createTime',
              label: '添加时间',
              type: 'datetime',
              width: 150,
            },
            {
              type: 'operation',
              label: '操作',
              width: 80,
              buttons: ['$preset.actions.edit', '$preset.actions.remove'],
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
        dialog: {
          title: '添加一个组织',
          actions: [],
          // size: 'lg',
          bodyClassName: 'p-none',
          body: '$preset.forms.addOrg',
        },
      },
      edit: {
        type: 'action',
        iconOnly: true,
        tooltip: '编辑',
        icon: 'iconfont icon-edit',
      },
      member: {
        type: 'action',
        iconOnly: true,
        tooltip: '成员管理',
        icon: 'fa fa-user-o',
      },
      remove: {
        type: 'action',
        iconOnly: true,
        tooltip: '删除',
        icon: 'iconfont icon-close text-danger',
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
                actionType: 'close',
                onAction: () => {
                  app.routerHistory.push(`/org/${store.addOrgId}/login`)
                },
              },
              {
                type: 'action',
                label: '关闭',
                level: 'primary',
                actionType: 'close',
              },
            ],
          },
        ],
      },
      filter: {
        type: 'form',
        wrapWithPanel: false,
        mode: 'inline',
        controls: [
          {
            type: 'text',
            name: 'keywords',
            placeholder: '请输入ID',
            addOn: {
              iconOnly: true,
              icon: 'iconfont icon-ai-search',
              type: 'submit',
            },
          },
        ],
      },
    },
    apis: {
      listOrg: getApiOption({
        apiType: 'category',
        apiName: 'list',
        data: {
          '&': '$$',
          type: relation.org.entity.type,
        },
      }),
      addOrg: {
        url: 'fakeAddOrg',
        onFakeRequest: async () => {
          // const { username, password, ...rest } = option.data
          // const { value: orgAdmUserId } = await requestApi<any>('user', 'add', {
          //   ...relation.org.user,
          //   username,
          //   password,
          // })
          // const { value: orgConfId } = await requestApi<any>('config', 'add', {
          //   ...rest,
          //   type: relation.org.entity.type,
          // })
          // const { value: orgId } = await requestApi<any>('category', 'add', {
          //   ...relation.org.entity,
          //   relation1: orgConfId,
          //   relation2: orgAdmUserId,
          // })
          // await requestApi<any>('user', 'edit', {
          //   id: orgAdmUserId,
          //   relation2: orgId,
          // })

          store.addOrgId = '1000'

          return {
            status: 0,
          }
        },
      },
    },
  },
}

export default orgSchema
