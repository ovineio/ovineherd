import styled, { css } from 'styled-components'

export const StyledSetting = styled.div`
  ${({ theme: { ns } }) => css`
    .${ns}Page {
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    }

    .${ns}Tabs--vertical {
      .${ns}Tabs-links {
        width: 240px;
        background-color: #fff;
        border-right: 1px solid #e6e6e6;
      }
      .${ns}Tabs-link {
        a {
          padding-left: 10px;
        }
        &.is-active {
          & > a:only-child {
            background-color: rgb(241, 241, 243);
          }
        }
      }
      .${ns}Panel {
        box-shadow: none;
      }
      .${ns}Tabs {
        border: 0;
      }

      .${ns}Spinner {
        width: 40px;
        height: 40px;
      }
    }
  `}
`
