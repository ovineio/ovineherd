// 全局样式

import { css } from 'styled-components'

// styled-components 文档 https://styled-components.com/, 介绍文章 https://www.jianshu.com/p/2178abb2ee95
// 需要下载 编辑器对应的 styled-components 插件，支持高亮，样式写法与 scss 类似
// theme 能获取到所有 styled/themes 定义的主题变量， css 是用于高亮显示与智能提示的

// 全局样式, 这里和 scss 类似支持嵌套，与styled变量，
// 以下用作举例：

const globalStyle = ({ ns }) => css`
  .cursor-p {
    cursor: pointer;
  }

  .${ns}Checkbox {
    white-space: nowrap;
  }
  .g-no-border-table {
    .${ns}Table {
      border: 0;
    }
    .${ns}Table-toolbar {
      padding: 15px 0;
    }
  }
  .g-normal-spinner {
    .${ns}Spinner {
      width: 40px;
      height: 40px;
    }
  }

  .${ns}Crud-toolbar {
    .${ns}Form-item {
      margin-bottom: 0;
    }
  }
`

export const tabsPageCss = ({ ns }) => css`
  .${ns}Page-body {
    padding: 10px 0 0;
  }
  .${ns}Tabs {
    .${ns}Tabs-content {
      padding-top: 0;
    }
  }
  .${ns}Tabs-links {
    padding-left: 20px;
  }
  .${ns}Panel {
    border: 0;
    box-shadow: none;
  }
  .${ns}Tabs-pane {
    padding: 0;
  }
  .${ns}Panel-heading {
    display: none;
  }
  .${ns}Panel-body {
    padding: 0;
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
`

export default globalStyle
