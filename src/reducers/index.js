import { combineReducers } from 'redux';
import user from './user';
import users from './users';
import quiz from './quiz';

export default combineReducers({
  user,
  users,
  quiz
});
