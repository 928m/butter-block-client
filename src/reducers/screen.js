import { cloneDeep } from 'lodash';
import { COLOR_SETTINGS } from '../actions/actionTypes';

const initialState = {
  color: 0xfbbc05,
  colors: ['0x000000', '0xffffff', '0xf44336', '0xfbbc05', '0x006b76', '0x2777ce', '0x6d40bf']
};

const screen = (state = initialState, action) => {
  const {
    type,
    color
  } = action;
  const newScreen = cloneDeep(state);

  switch (type) {
    case COLOR_SETTINGS:
      newScreen.color = color;

      return newScreen;
    default:
      return state;
  }
};

export default screen;
