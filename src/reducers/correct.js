import { cloneDeep } from 'lodash';
import {
  CORRECT,
  INITIAL_TIME_COUNT,
  INITIALIZE_CORRECT_ANSWER_INFORMATION,
  TIME_OUT
} from '../actions/actionTypes';

const initialState = {
  id: '',
  isPass: false,
  isTimeout: false,
  nickname: '',
  solution: ''
};

const correct = (state = initialState, action) => {
  const {
    type,
    nickname,
    id,
    solution
  } = action;
  const newCorrect = cloneDeep(state);

  switch (type) {
    case CORRECT:
      newCorrect.nickname = nickname;
      newCorrect.id = id;
      newCorrect.solution = solution;
      newCorrect.isPass = true;

      return newCorrect;
    case TIME_OUT:
      newCorrect.isTimeout = true;

      return newCorrect;
    case INITIAL_TIME_COUNT:
      newCorrect.isTimeout = false;

      return newCorrect;
    case INITIALIZE_CORRECT_ANSWER_INFORMATION:
      return initialState;
    default:
      return state;
  }
};

export default correct;
