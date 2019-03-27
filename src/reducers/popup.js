import { CLOSE_POPUP, OPEN_POPUP } from '../actions/actionTypes';

const popup = (state = false, action) => {
  const { type } = action;

  switch (type) {
    case OPEN_POPUP:
      return true;
    case CLOSE_POPUP:
      return false;
    default:
      return state;
  }
};

export default popup;
