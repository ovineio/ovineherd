import styled from 'styled-components'

export const StyledRegister = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;

  .cxd-Page-body {
    position: fixed;
    height: 100%;
    width: 100%;
  }

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

  .cxd-Panel--form {
    position: relative;
    border: 0;
    padding: 0;
    margin: 0;
    box-shadow: none;
  }
  .cxd-Panel-heading {
    display: none;
  }
  .cxd-Panel-body {
    padding: 0;
  }
  .cxd-Panel-footer {
    padding-right: 0;
  }
`
