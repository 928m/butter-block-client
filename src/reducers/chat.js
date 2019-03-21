import { cloneDeep } from 'lodash';

const chat = (state = {}, action) => {
  const {
    type,
    id,
    message
  } = action;
  const newChat = cloneDeep(state);

  switch (type) {
    case 'RECEIVE_MESSAGE':
      newChat[id] = message;

      return newChat;
    default:
      return state;
  }
};

export default chat;
