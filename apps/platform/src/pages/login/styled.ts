import styled from 'styled-components'

export const Login = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;

  .img-bk {
    min-width: 105%;
    min-height: 105%;
    position: absolute;
    left: 50%;
    top: 50%;
    filter: blur(5px);
    transform: translate(-50%, -50%);
    opacity: 0.5;
  }
  .admin-mark {
    position: absolute;
    top: 0;
    left: -5px;
    span {
      position: absolute;
      z-index: 2;
      display: block;
      left: 0;
      top: 0;
      width: 100%;
      line-height: 23px;
      text-align: center;
      text-indent: -5px;
      color: #fff;
    }
  }
  .icon-leftTopMark {
    width: 100px;
    height: 30px;
  }

  a {
    color: #167ffc;
    &:hover {
      text-decoration: underline;
    }
  }

  .login-card {
    display: flex;
    flex-wrap: nowrap;
    width: 600px;
    height: 400px;
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
    font-size: 12px;

    .login-form {
      width: 50%;
      padding: 20px;

      span {
        display: block;
        margin-bottom: 3px;
        color: #888;
      }

      input {
        border: 1px solid #d8d8d8;
        padding: 10px;
        font-size: 12px;
        display: block;
        width: 100%;
        outline: none;

        margin-bottom: 20px;
        transition: border 0.2s ease-in-out;

        &:focus {
          border-color: #167ffc;
        }
      }
      .tip-text {
        margin: -10px 0 0 0;
        height: 20px;
        line-height: 20px;
        color: #ea5151;
      }

      .register-text {
        margin-top: 15px;
        height: 20px;
        line-height: 20px;
      }

      .btn-submit {
        margin-top: 15px;
        top: 0;
        width: 100%;
        height: 40px;
        border: 0;
        box-shadow: 0 0 0 transparent;
        outline: none;
        position: relative;
        transition: all 0.2s ease-in-out;
        background: linear-gradient(to right, #167ffc, #595bd4);
        color: #fff;

        i,
        span {
          margin: 0;
          display: inline-block;
          vertical-align: middle;
          color: #fff;
        }

        span {
          margin-left: 5px;
        }

        &:hover {
          background: linear-gradient(to right, rgb(9, 116, 243), rgb(52 55 216));
        }
      }

      .text-muted {
        font-size: 12px;
        margin-top: 15px;
        display: block;
      }
    }

    .logo-brand {
      height: 75px;
      margin-bottom: 30px;
      text-align: center;
      img {
        width: auto;
        height: 40px;
      }
      span {
        font-size: 14px;
        margin: 10px 0 0;
      }
    }

    .login-picture {
      width: 50%;
      height: 100%;
      overflow: hidden;
      position: relative;

      img {
        min-width: 300px;
        max-height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`
