import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import quiz from './quiz';
import chat from './chat';
import screen from './screen';
import correct from './correct';
import popup from './popup';

export default combineReducers({
  user,
  users,
  quiz,
  chat,
  screen,
  correct,
  popup
});
