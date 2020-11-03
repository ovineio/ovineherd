import styled from 'styled-components'

export const Login = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  font-family: 'Comfortaa', sans-serif;

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

  a {
    color: #3cabdb;
  }

  .login-card {
    overflow: hidden;
    width: 600px;
    height: 400px;
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: table;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);

    /* border-radius: 5px; */

    .side {
      width: 50%;
      float: left;

      &.form {
        padding: 20px;

        .img-logo {
          font-size: 14px;
          margin-bottom: 30px;
          text-align: center;
        }

        span {
          display: block;
          font-size: 12px;
          font-weight: bold;
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

        .btn-submit {
          margin-top: 40px;
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

      &.picture {
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
  }
`
