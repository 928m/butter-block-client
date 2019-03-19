import { cloneDeep } from 'lodash';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_TYPE':
      return false;
    default:
      return state;
  }
};

export default user;
