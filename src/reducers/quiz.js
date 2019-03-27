import { cloneDeep } from 'lodash';
import {
  GAME_OVER,
  PROBLEM_SUBMISSION_INFO_SETTINGS,
  PROBLEM_INFO_SETTINGS,
  SET_TIMER
} from '../actions/actionTypes';

const initialState = {
  time: 0,
  isStart: false,
  problem: '',
  problemLength: 0,
  submissionUserId: '',
  submissionUserNickName: '',
  isOver: false
};

const quiz = (state = initialState, action) => {
  const {
    type,
    time,
    problem,
    problemLength,
    submissionUserId,
    submissionUserNickName
  } = action;
  const newQuiz = cloneDeep(state);

  switch (type) {
    case PROBLEM_SUBMISSION_INFO_SETTINGS:
      newQuiz.problem = problem;

      return newQuiz;
    case PROBLEM_INFO_SETTINGS:
      newQuiz.isStart = true;
      newQuiz.timer = initialState.timer;
      newQuiz.problemLength = problemLength;
      newQuiz.submissionUserId = submissionUserId;
      newQuiz.submissionUserNickName = submissionUserNickName;

      return newQuiz;
    case SET_TIMER:
      newQuiz.time = time;

      return newQuiz;
    case GAME_OVER:
      newQuiz.isStart = false;
      newQuiz.isOver = true;

      return newQuiz;
    default:
      return state;
  }
};

export default quiz;
