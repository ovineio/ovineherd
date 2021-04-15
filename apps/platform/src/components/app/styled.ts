/**
 * qiankun 全局样式 有 BUG
 */

import { createGlobalStyle, css } from 'styled-components'

export const AppStyle = createGlobalStyle`
    span.badge {
        font-size: 10px;
    }

    ${({ theme: { ns } }: any) => css`
      .table-cell-image {
        .${ns}Image {
          padding: 0;
          &-thumb {
            width: 50px;
            height: 50px;
            overflow: inherit;
          }
        }
      }

      .${ns}ImageControl-pasteTip {
        z-index: 2;
      }

      .${ns}Page-main {
        background-color: transparent;
      }

      .${ns}Modal-header {
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
      }
      .${ns}Modal-body {
        padding-bottom: 1rem;
      }
      .${ns}Modal-footer {
        margin: 0;
        padding-left: 1.875rem;
        padding-right: 1.875rem;
      }
      .${ns}TextareaControl {
        color: #666;
      }
      .${ns}Table-toolbar {
        padding: 0.625rem 20px;
      }

      .${ns}section-header {
        font-size: 16px;
        color: #333;
        border-left: #108cee 0.25rem solid;
        line-height: 1.2;
        padding: 0 0 0 14px;
        border-bottom: 0;
        font-weight: 400;
      }

      .${ns}Wizard--horizontal {
        .${ns}Wizard-steps {
          ul {
            margin-left: -20px;
          }
        }
      }

      .${ns}Table-table > tbody > tr > td,
      .${ns}Table-table > tbody > tr > th {
        vertical-align: middle !important;
      }

      .${ns}Crud-toolbar {
        .${ns}Form-item {
          margin-bottom: 0;
        }
      }

      // 重写提示
      .${ns}Image-overlay {
        a {
          &[data-position='bottom']:after {
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
          }
          &[data-position='bottom']:hover:after {
            margin: 0 0 0 var(--Tooltip--attr-gap);
          }
        }
      }
    `}
`
