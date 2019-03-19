import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Logo from './Logo';
import Input from './Input';

const LoginWrap = styled.section`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, .9);
`;

const LoginCont = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  justify-content: center;
`;

const Login = () => {
  return (
    <LoginWrap className="login-wrap">
      <div className="inner">
        {/* <Logo /> */}
        <LoginCont>
          <Input type="text" placeholder="create your name" />
          <Button type="button">login</Button>
        </LoginCont>
      </div>
    </LoginWrap>
  );
};

export default Login;
