// 全局样式

import { css } from 'styled-components'

// styled-components 文档 https://styled-components.com/, 介绍文章 https://www.jianshu.com/p/2178abb2ee95
// 需要下载 编辑器对应的 styled-components 插件，支持高亮，样式写法与 scss 类似
// theme 能获取到所有 styled/themes 定义的主题变量， css 是用于高亮显示与智能提示的

// 全局样式, 这里和 scss 类似支持嵌套，与styled变量，
// 以下用作举例：
const svg = require('@generated/styles/themes/spinner-default.svg')

const globalStyle = () => css`
  .cxd-Spinner {
    background-image: url(${svg}) !important;
  }
  .cursor-p {
    cursor: pointer;
  }
  .cxd-TextareaControl {
    color: #666;
  }
  .g-no-border-table {
    .cxd-Table {
      border: 0;
    }
    .cxd-Table-toolbar {
      padding: 15px 0;
    }
  }
  .g-normal-spinner {
    .cxd-Spinner {
      width: 40px;
      height: 40px;
    }
  }
`

export const tabsPageCss = () => css`
  .cxd-Page-body {
    padding: 10px 0 0;
  }
  .cxd-Tabs {
    .cxd-Tabs-content {
      padding-top: 0;
    }
  }
  .cxd-Tabs-links {
    padding-left: 20px;
  }
  .cxd-Panel {
    border: 0;
    box-shadow: none;
  }
  .cxd-Tabs-pane {
    padding: 0;
  }
  .cxd-Panel-heading {
    display: none;
  }
  .cxd-Panel-body {
    padding: 0;
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
`

export default globalStyle
