import styled from 'styled-components'

const HeaderHeight = 60

export const Header = styled.div`
  position: relative;
  height: ${HeaderHeight}px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
  transition: background 0.3s, width 0.2s;

  .container {
    height: ${HeaderHeight}px;
  }

  .navbar {
    padding: 0;
    color: rgba(0, 0, 0, 0.9);
    .nav-link {
      height: ${HeaderHeight}px;
      line-height: ${HeaderHeight}px;
      padding: 0 15px;
      color: rgba(0, 0, 0, 0.9);
      &:hover {
        background-color: rgb(241 241 241);
        color: #108cee;
      }
    }
    .nav-active {
      color: #108cee !important;
    }
  }
`

export const Layout = styled.div`
  background-color: #faf9f8;
`

export const Body = styled.div``
