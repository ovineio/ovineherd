import styled from 'styled-components'

export const StyledAppCards = styled.div`
  .new-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 160px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.44, 0.9, 0.6, 0.94);
    &:hover {
      box-shadow: 0 6px 16px rgba(38, 38, 38, 0.14);
    }
  }
  .items-grid {
    margin: 0 -6px;
    & > div {
      padding: 0 6px;
      cursor: pointer;
    }
  }
`

export const StyledCardItem = styled.div`
  height: 160px;
  margin-bottom: 16px;
  &:hover {
    .item-info {
      p {
        max-height: 42px;
        margin-top: 5px;
      }
    }
    .item-mask {
      background: rgba(0, 0, 0, 0.5);
    }
    .item-content {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(38, 38, 38, 0.14);
    }
    .item-actions {
      opacity: 1;
    }
  }

  .item-content {
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    color: #000;
    transition: all 0.3s cubic-bezier(0.44, 0.9, 0.6, 0.94);
  }
  .item-mask,
  .item-cover {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
  }

  .item-mask {
    background: rgba(0, 0, 0, 0);
    transition: all 0.3s cubic-bezier(0.44, 0.9, 0.6, 0.94);
  }

  .item-cover {
    height: 100%;
    background-size: cover;
  }

  .item-actions {
    display: flex;
    position: absolute;
    z-index: 3;
    top: 16px;
    right: 16px;
    padding: 0;
    margin: 0;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.44, 0.9, 0.6, 0.94);
    color: #fff;
    li {
      margin-left: 12px;
      font-size: 16px;
    }
  }

  .item-info {
    overflow: hidden;
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    padding: 12px 16px 12px;
    font-size: 14px;
    box-sizing: border-box;
    background-color: #fff;
    p {
      margin: 0;
      max-height: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.44, 0.9, 0.6, 0.94);
    }
  }

  .item-title {
    margin: 0;
    i {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
      background-size: cover;
      margin-right: 6px;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
`
