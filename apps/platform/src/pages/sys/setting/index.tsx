import React from 'react'

import { Amis } from '@core/components/amis/schema'

import * as S from './styled'

export default () => {
  const settingSchema = {
    type: 'tabs',
    mode: 'vertical',
    tabs: [
      {
        title: '个人资料',
        hash: 'tab0',
        icon: 'fa p-r-xs fa-user-circle',
        body: [
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '我的资料',
            body: {
              type: 'form',
              wrapWithPanel: false,
              mode: 'horizontal',
              controls: [
                {
                  type: 'grid',
                  mode: 'normal',
                  columns: [
                    {
                      md: 6,
                      mode: 'horizontal',
                      horizontal: {
                        left: 'col-md-3',
                        right: 'col-md-9',
                      },
                      controls: [
                        {
                          type: 'text',
                          name: 'name',
                          required: true,
                          size: 'md',
                          placeholder: '请输入用户名',
                          label: '用户名',
                        },
                        {
                          type: 'text',
                          name: 'short_name',
                          required: true,
                          size: 'md',
                          placeholder: '请输入昵称',
                          label: '昵称',
                        },
                        {
                          type: 'text',
                          name: 'name',
                          required: true,
                          size: 'md',
                          placeholder: '请输入邮箱地址',
                          label: '邮箱',
                        },
                        {
                          type: 'text',
                          name: 'name',
                          required: true,
                          size: 'md',
                          placeholder: '请输入手机号',
                          label: '联系方式',
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
                          type: 'image',
                          name: 'logo',
                          required: true,
                          size: 'md',
                          label: '头像',
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'submit',
                  mode: 'normal',
                  className: 'm-t-lg m-b-none',
                  label: '保存个人信息',
                  icon: 'fa fa-check pull-left',
                  level: 'primary',
                },
              ],
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'panel',
            className: ' ',
            headerClassName: 'cxd-section-header m-t-md m-b-sm',
            title: '账户安全',
            body: [
              {
                type: 'alert',
                body: '为了保障账户安全，请定期修改密码。以免密码遗漏，带来不要的损失。',
                level: 'info',
              },
              {
                type: 'action',
                label: '修改密码',
                icon: 'fa fa-lock pull-left',
                size: 'md',
              },
            ],
          },
        ],
      },
      {
        title: '平台配置',
        hash: 'tab1',
        icon: 'fa p-r-xs fa-cog',
        body: {
          type: 'form',
          wrapWithPanel: false,
          className: 'p-md',
          mode: 'horizontal',
          controls: [
            {
              type: 'grid',
              mode: 'normal',
              columns: [
                {
                  md: 6,
                  mode: 'horizontal',
                  horizontal: {
                    left: 'col-md-3',
                    right: 'col-md-9',
                  },
                  controls: [
                    {
                      type: 'text',
                      name: 'name',
                      required: true,
                      size: 'md',
                      placeholder: '请输入组织名称',
                      label: '组织名称',
                    },
                    {
                      type: 'text',
                      name: 'short_name',
                      required: true,
                      size: 'md',
                      placeholder: '请输入简称',
                      label: '组织简称',
                    },
                    {
                      type: 'text',
                      name: 'short_tag',
                      required: true,
                      size: 'md',
                      placeholder: '请输入标语',
                      label: '标语',
                    },
                    {
                      type: 'text',
                      name: 'short_name',
                      required: true,
                      size: 'md',
                      placeholder: '请输入短名字',
                      label: '短名字',
                    },
                    {
                      type: 'text',
                      name: 'phone_no',
                      required: true,
                      size: 'md',
                      placeholder: '请输入手机号',
                      label: '联系方式',
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
                      type: 'image',
                      name: 'logo',
                      required: true,
                      size: 'md',
                      label: '组织LOGO',
                    },
                    {
                      type: 'textarea',
                      name: 'name',
                      size: 'md',
                      placeholder: '请输入组织介绍',
                      label: '组织介绍',
                    },
                  ],
                },
              ],
            },
            {
              type: 'divider',
            },
            {
              type: 'number',
              name: 'name',
              required: true,
              value: 10,
              size: 'md',
              label: '部门最高层级',
            },
            {
              type: 'switch',
              name: 'name',
              required: true,
              value: 10,
              size: 'md',
              label: '经理创建子部门',
            },
            {
              type: 'divider',
            },
            {
              type: 'submit',
              mode: 'normal',
              className: 'm-t-lg',
              label: '保存设置信息',
              icon: 'fa fa-check pull-left',
              level: 'primary',
            },
          ],
        },
      },
      // {
      //   title: '危险操作',
      //   hash: 'tab6',
      //   icon: 'fa p-r-xs fa-power-off',
      //   body: [
      //     {
      //       type: 'panel',
      //       className: ' ',
      //       headerClassName: 'cxd-section-header m-t-sm m-b-sm',
      //       title: '退出组织',
      //       body: [
      //         {
      //           type: 'alert',
      //           body: '退出组织，您将无法再次登陆到系统中',
      //           level: 'info',
      //         },
      //         {
      //           type: 'action',
      //           label: '删除组织',
      //           level: 'danger',
      //         },
      //       ],
      //     },
      //     {
      //       type: 'divider',
      //     },
      //     {
      //       type: 'panel',
      //       className: ' ',
      //       headerClassName: 'cxd-section-header m-t-sm m-b-sm',
      //       title: '删除组织',
      //       body: [
      //         {
      //           type: 'alert',
      //           body: '您有未删除的应用，无法删除组织',
      //           level: 'info',
      //         },
      //         {
      //           type: 'action',
      //           label: '删除组织',
      //           level: 'danger',
      //         },
      //       ],
      //     },
      //     {
      //       type: 'divider',
      //     },
      //     {
      //       type: 'panel',
      //       title: '转移组织',
      //       className: ' ',
      //       headerClassName: 'cxd-section-header m-t-md m-b-sm',
      //       body: [
      //         {
      //           type: 'alert',
      //           body: {
      //             type: 'html',
      //             html: `
      //               <h6>转移须知</h6>
      //               <ul>
      //                 <li>只能转移给企业成员，转移后该成员将拥有企业的最高权限</li>
      //                 <li>勾选移除自己，您将会在转移成功后被移出企业</li>
      //                 <li>接收方需绑定手机号码后才可接收企业  </li>
      //               </ul>
      //             `,
      //           },
      //           level: 'info',
      //         },
      //         {
      //           type: 'action',
      //           label: '转移组织',
      //           level: 'danger',
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
  }

  return (
    <S.StyledSetting className="container">
      <Amis schema={settingSchema} />
    </S.StyledSetting>
  )
}
