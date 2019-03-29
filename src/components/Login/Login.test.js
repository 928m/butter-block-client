import React from 'react';
import ReactDOM from 'react-dom';
import Login from './index';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Login', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('component element check', () => {
    const login = mount(<Login />);
    const loginInput = login.find('input');
    const loginButton = login.find('button');
    const loginNotice = login.find('p');
    const loginLogo = login.find('Logo');

    expect(loginInput.length).toBe(1);
    expect(loginButton.length).toBe(1);
    expect(loginLogo.length).toBe(1);
    expect(loginNotice.length).toBe(1);
    expect(loginLogo.find('h1').length).toBe(1);
  });

  it('component state check', () => {
    const login = shallow(<Login />);
    const loginState = login.state();

    expect(loginState.value).toBe('');
    expect(loginState.isPass).toBeFalsy();
  });

  it('component state value change check', () => {
    const login = shallow(<Login />);
    const loginState = login.state();

    expect(loginState.value).toBe('');

    login.setState({ value: 'nickname' });

    expect(login.state().value).toBe('nickname');
  });

  it('component input onchange event check - has value', () => {
    const login = mount(<Login />);
    const mockEvent = { target: { value: 'nickname' } };

    expect(login.state().value).toBe('');
    expect(login.state().isPass).toBeFalsy();

    login.find('input').simulate('change', mockEvent);

    expect(login.state().value).toBe('nickname');
    expect(login.state().isPass).toBeTruthy();
  });

  it('component input onchange event check - empty value', () => {
    const login = mount(<Login />);
    const mockEvent = { target: { value: '' } };

    expect(login.state().value).toBe('');
    expect(login.state().isPass).toBeFalsy();

    login.find('input').simulate('change', mockEvent);

    expect(login.state().value).toBe('');
    expect(login.state().isPass).toBeFalsy();
    expect(login.state().value).not.toBe('nickname');
    expect(login.state().isPass).not.toBeTruthy();
  });

  it('component props type check', () => {
    const fn = jest.fn();
    const login = mount(<Login onClickLogin={fn} />);

    login.setState({ value: 'value' });
    login.find('button').simulate('click');

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('component props check props type', () => {
    const fn = jest.fn();
    const login = mount(<Login onClickLogin={fn} />);

    expect(typeof login.props().onClickLogin).toBe('function');
  });

  it('component props check fn invoked', () => {
    const fn = jest.fn();
    const login = mount(<Login onClickLogin={fn} />);

    login.setState({ value: '' });
    login.find('button').simulate('click');

    expect(fn).toHaveBeenCalledTimes(0);

    login.setState({ value: '   ' });
    login.find('button').simulate('click');

    expect(fn).toHaveBeenCalledTimes(0);

    login.setState({ value: 'value' });
    login.find('button').simulate('click');

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('component static fn check', () => {
    const login = mount(<Login />);
    const loginInstance = login.instance();

    expect(loginInstance.validateString('')).toBeFalsy();
    expect(loginInstance.validateString(' ')).toBeFalsy();
    expect(loginInstance.validateString(' ')).not.toBeTruthy();
    expect(loginInstance.validateString('value')).toBeTruthy();
  });
});
