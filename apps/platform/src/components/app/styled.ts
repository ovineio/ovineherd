import { createGlobalStyle } from 'styled-components'

// TODO: 移动端展示兼容

export const AppStyle = createGlobalStyle`
    .app-root {
        background-color: #faf9f8;
    }

    span.badge {
        font-size: 10px;
    }

    .table-cell-image {
        .cxd-Image {
            width: 50px;
            height: 50px;
            padding: 0;
            &-thumb {
                overflow: inherit;
                height: 100%;
            }
        }
    }

    .cxd-Spinner {
        background: url(${require('@generated/styles/themes/spinner-default.svg')}) !important;
    }

    .cxd-ImageControl-pasteTip {
        z-index: 2;
    }

    .cxdp

    .cxd-Page-main{
        background-color: transparent;
    }

    .cxd-Modal-header {
        padding-top: 0.8rem;
        padding-bottom: 0.8rem;
    }
    .cxd-Modal-body {
        padding-bottom: 1rem;
    }
    .cxd-Modal-footer {
        margin: 0;
        padding-left: 1.875rem;
        padding-right: 1.875rem;
    }
    .cxd-TextareaControl {
        color: #666;
    }
    .cxd-Table-toolbar {
        padding: 0.625rem 20px
    }

    .cxd-section-header {
        font-size: 16px;
        color: #333;
        border-left: #108cee 0.25rem solid;
        line-height: 1.2;
        padding: 0 0 0 14px;
        border-bottom: 0;
        font-weight: 400;
    }

    .cxd-Wizard--horizontal {
        .cxd-Wizard-steps {
            ul {
                margin-left: -20px;
            }
        }
    }

    .cxd-Table-table > tbody > tr > td,
    .cxd-Table-table > tbody > tr > th {
        vertical-align: middle;
    }
`
