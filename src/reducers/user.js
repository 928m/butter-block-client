import { cloneDeep } from 'lodash';

const initialState = {
  id: '',
  order: 0,
  users: []
};

const user = (state = initialState, action) => {
  const {
    type,
    id,
    order
  } = action;
  const newUser = cloneDeep(state);

  switch (type) {
    case 'USER_INFO_SETTINGS':
      newUser.id = id;
      newUser.order = order;

      return newUser;
    default:
      return state;
  }
};

export default user;
