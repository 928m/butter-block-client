import { cloneDeep } from 'lodash';
import { USER_INFO_SETTINGS } from '../actions/actionTypes';

const initialState = {
  id: ''
};

const user = (state = initialState, action) => {
  const {
    type,
    id
  } = action;
  const newUser = cloneDeep(state);

  switch (type) {
    case USER_INFO_SETTINGS:
      newUser.id = id;

      return newUser;
    default:
      return state;
  }
};

export default user;
