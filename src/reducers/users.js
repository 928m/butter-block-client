const users = (state = [], action) => {
  const {
    type,
    users
  } = action;

  switch (type) {
    case 'USER_LIST_SETTINGS':
      return users;
    default:
      return state;
  }
};

export default users;
