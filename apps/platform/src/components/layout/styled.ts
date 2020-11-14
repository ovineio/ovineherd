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

export const UserItem = styled.div`
  position: relative;

  .avatar-item {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    border: 4px solid transparent;
    cursor: pointer;
    &:hover {
      border-color: #e0e0e0;
    }
  }
  .avatar-img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    background-color: #2da0fd;
  }
  .info-title {
    .avatar-img {
      width: 20px;
      height: 20px;
      line-height: 20px;
      margin-right: 8px;
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
    }
  }
  .info-action {
    display: none;
    box-sizing: border-box;
    position: absolute;
    width: 120px;
    right: 0;
    top: 50px;
    font-size: 14px;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
    margin: 0;
    padding: 0;
    &.show {
      display: block;
    }
    li {
      padding: 8px 15px;
      list-style: none;
      background: #fff;
      &:not(.info-title):hover {
        cursor: pointer;
        background-color: rgb(241 241 241);
        color: #108cee;
      }
      a {
        color: inherit;
      }
      i {
        display: inline-block;
        width: 20px;
        text-align: center;
        margin-right: 8px;
        font-size: 14px;
      }
    }
  }
`
