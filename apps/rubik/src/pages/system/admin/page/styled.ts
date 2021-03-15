import { css } from 'styled-components'

const appPageCss = ({ ns }) => css`
  .filter-form {
    .${ns}Button {
      position: absolute;
      z-index: 2;
      border: 0;
      background: transparent;
      color: #a2a2a2;
    }
    .${ns}TreeSelect {
      padding-left: 30px;
    }
  }
  .${ns}Table-content {
    overflow: visible;
  }
`

export default appPageCss
