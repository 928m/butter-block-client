import { cloneDeep } from 'lodash';

const users = (state = [], action) => {
  const {
    type,
    users
  } = action;
  const newUsers = cloneDeep(users);

  switch (type) {
    case 'USER_LIST_SETTINGS':
      return newUsers;
    default:
      return state;
  }
};

export default users;
