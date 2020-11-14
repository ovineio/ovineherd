import { createGlobalStyle } from 'styled-components'

export const AppStyle = createGlobalStyle`
    .app-root {
        background-color: #faf9f8;
    }

    .cxd-Page-main{
        background-color: transparent;
    }

    // TODO: 处理字体大小问题

    /* .cxd-Table-table {
        font-size: unset;
    }

    .cxd-Form {
        font-size: unset;
    } */

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

    .cxd-section-header {
        padding: 16px 0;
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
`
