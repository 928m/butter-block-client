import React, { Component } from 'react';
import {
  Button,
  Notice,
  Input,
  LoginWrap,
  LoginCont
} from '../StyledComponents';
import { Logo } from '../elements/Logo';

class Login extends Component{
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isPass: false
    };

    this.onChangeInputValue = this.onChangeInputValue.bind(this);
    this.onClickLoginButton = this.onClickLoginButton.bind(this);
    this.validateString = this.validateString.bind(this);
  }

  onChangeInputValue(ev) {
    const value = ev.target.value;
    const isPass = this.validateString(value);

    this.setState({ value, isPass });
  }

  onClickLoginButton() {
    const { value } = this.state;
    const { onClickLogin } = this.props;
    const isPass = this.validateString(value);

    if (isPass) {
      onClickLogin(value);
      this.setState({ isPass });
    } else {
      this.setState({ isPass });
    }
  }

  validateString(value) {
    return Boolean(value.trim());
  }

  render() {
    const { isPass } = this.state;

    return (
      <LoginWrap className="login-wrap">
        <div className="inner">
          <Logo />
          <LoginCont>
            <Input type="text" placeholder="create your name" onChange={this.onChangeInputValue} />
            {
              !isPass
                ? <Notice>닉네임을 입력해주세요.</Notice>
                : null
            }
            <Button type="button" onClick={this.onClickLoginButton}>login</Button>
          </LoginCont>
        </div>
      </LoginWrap>
    );
  };
};

export default Login;
