import React from 'react'

import { Amis } from '@core/components/amis/schema'

import Section from '~/components/section'

import * as S from './styled'

export default () => {
  const treeSchema = {
    type: 'form',
    api: 'https://houtai.baidu.com/api/mock2/form/saveForm',
    wrapWithPanel: false,
    controls: [
      {
        type: 'tree',
        name: 'tree1',
        initiallyOpen: true,
        rootCreatable: false,
        creatable: true,
        editable: true,
        showIcon: false,
        removable: true,
        unfoldedLevel: 1,
        options: [
          {
            label: 'A',
            value: 'a',
          },
          {
            label: 'B',
            value: 'b',
            children: [
              {
                label: 'B-1',
                value: 'b-1',
              },
              {
                label: 'B-2',
                value: 'b-2',
                children: [
                  {
                    label: 'B-2-1',
                    value: 'b-2-1',
                  },
                  {
                    label: 'B-2-2',
                    value: 'b-2-2',
                  },
                  {
                    label: 'B-2-3',
                    value: 'b-2-3',
                  },
                ],
              },
              {
                label: 'B-3',
                value: 'b-3',
              },
            ],
          },
          {
            label: 'C',
            value: 'c',
          },
        ],
      },
    ],
  }

  const tableSchema = {
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
    headerToolbar: ['$preset.forms.filter', '$preset.actions.add'],
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
        width: 60,
        buttons: ['$preset.actions.edit', '$preset.actions.remove'],
      },
    ],
    preset: {
      actions: {
        add: {
          type: 'action',
          align: 'right',
          label: '添加成员',
          level: 'primary',
          icon: 'iconfont icon-plus pull-left',
        },
        edit: {
          type: 'action',
          iconOnly: true,
          tooltip: '编辑',
          icon: 'iconfont icon-edit',
        },
        remove: {
          type: 'action',
          iconOnly: true,
          tooltip: '删除',
          icon: 'iconfont icon-close text-danger',
        },
      },
      forms: {
        filter: {
          type: 'form',
          wrapWithPanel: false,
          mode: 'inline',
          controls: [
            {
              type: 'text',
              name: 'keywords',
              placeholder: '请输入 ID/名称/邮箱 搜索',
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

  return (
    <S.StyledTeam>
      <h5 className="m-b-md">我的团队</h5>
      <div className="row">
        <div className="col-lg-4">
          <Section title="团队组织结构">
            <Amis schema={treeSchema} />
          </Section>
        </div>
        <div className="col-lg-8">
          <Section title="团队成员列表" headerClassName="m-b-sm">
            <Amis schema={tableSchema} />
          </Section>
        </div>
      </div>
    </S.StyledTeam>
  )
}
