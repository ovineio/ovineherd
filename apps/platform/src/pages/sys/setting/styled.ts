import styled from 'styled-components'

export const StyledSetting = styled.div`
  .cxd-Page {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  }

  .cxd-Tabs-links {
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
  }

  .cxd-Tabs-link {
    a {
      padding-left: 10px;
    }
    &.is-active {
      & > a:only-child {
        background-color: rgb(241, 241, 243);
      }
    }
    &:hover {
    }
  }
  .cxd-Panel {
    box-shadow: none;
  }
  .cxd-Tabs {
    border: 0;
  }

  .cxd-Tabs-links {
    width: 240px;
  }
`
