import styled, { css } from 'styled-components'

export const StyledRegister = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;

  .img-bk {
    min-width: 105%;
    min-height: 105%;
    position: absolute;
    left: 50%;
    top: 50%;
    /* filter: blur(5px); */
    transform: translate(-50%, -50%);
    opacity: 0.9;
  }

  .register-card {
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    width: 500px;
    padding: 20px 40px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  }

  ${({ theme: { ns } }) => css`
    .${ns}Page-main {
      background: transparent;
    }
    .${ns}Page-body {
      position: fixed;
      height: 100%;
      width: 100%;
    }

    .${ns}Panel--form {
      position: relative;
      border: 0;
      padding: 0;
      margin: 0;
      box-shadow: none;
    }
    .${ns}Panel-heading {
      display: none;
    }
    .${ns}Panel-body {
      padding: 0;
    }
    .${ns}Panel-footer {
      padding-right: 0;
    }
  `}
`
