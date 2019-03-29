import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const color = 0xfbbc05;
const colors = ['0x000000', '0xffffff', '0xf44336', '0xfbbc05', '0x006b76', '0x2777ce', '0x6d40bf'];

describe('ColorPicker', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ColorPicker colors={colors} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('initial state selected', () => {
    const colorPicker = mount(<ColorPicker colors={colors} color={color} />);

    expect(colorPicker.state().selected).toEqual(color);
  });

  it('component li element check', () => {
    const colorPicker = mount(<ColorPicker colors={colors} />);

    expect(colorPicker.find('li').length).toEqual(colors.length);
  });

  it('component li element event check', () => {
    const onChangeColorFn = jest.fn();
    const colorPicker = mount(<ColorPicker colors={colors} onChangeColor={onChangeColorFn} />);

    colorPicker.find('li').first().simulate('click');

    expect(onChangeColorFn).toHaveBeenCalledTimes(1);
    expect(colorPicker.find('li').first().prop('className')).toContain('on');
    expect(colorPicker.find('li').first().prop('data-color')).toEqual(colorPicker.state().selected);
    expect(colorPicker.state().selected).toEqual(colorPicker.find('li').first().prop('data-color'));
  });

  it('component em element value', () => {
    const colorPicker = mount(<ColorPicker colors={colors} color={color} />);
    const hexColor = colors[0].slice(2, colors[0].length);

    expect(typeof colorPicker.state().selected).toBe('number');
    expect(typeof colorPicker.find('li').first().find('em').text()).toBe('string');
    expect(colorPicker.find('li').first().find('em').text()).toBe(`#${hexColor}`);
  });
});
