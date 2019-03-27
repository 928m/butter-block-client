import { cloneDeep } from 'lodash';
import { USER_LIST_SETTINGS } from '../actions/actionTypes';

const users = (state = [], action) => {
  const {
    type,
    users
  } = action;
  const newUsers = cloneDeep(users);

  switch (type) {
    case USER_LIST_SETTINGS:
      return newUsers;
    default:
      return state;
  }
};

export default users;
