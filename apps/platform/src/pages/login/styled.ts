import styled from 'styled-components'

export const Login = styled.div`
  .img-bk {
    min-width: 105%;
    min-height: 105%;
    position: absolute;
    left: 50%;
    top: 50%;
    filter: blur(5px);
    transform: translate(-50%, -50%);
    z-index: -1;
    opacity: 0.5;
  }

  a {
    color: #3cabdb;
  }

  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #000;
  }

  .card {
    overflow: hidden;
    width: 600px;
    height: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: table;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    .side {
      width: 50%;
      float: left;

      &.form {
        padding: 20px;

        .img-logo {
          text-align: center;
          margin-bottom: 10px;
        }

        span {
          display: block;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 3px;
          color: #888;
        }

        input {
          border: 2px solid #eee;
          padding: 10px;
          font-size: 11px;
          display: block;
          width: 100%;
          outline: none;
          font-family: 'Comfortaa', sans-serif;
          margin-bottom: 10px;
          border-radius: 3px;
          transition: border 0.2s ease-in-out;

          &:focus {
            border-color: #167ffc;
          }
        }

        .btn-submit {
          width: 100%;
          top: 0;
          height: 50px;
          background: linear-gradient(to right, #167ffc, #595bd4);
          border: 0;
          border-radius: 2px;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.4);
          color: #fff;
          font-family: 'Comfortaa', sans-serif;
          outline: none;
          position: relative;
          transition: all 0.2s ease-in-out;

          &:hover {
            box-shadow: 0 0 0 transparent;
            top: 3px;
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
