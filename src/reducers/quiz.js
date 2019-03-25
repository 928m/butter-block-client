import { cloneDeep } from 'lodash';

const initialState = {
  isStart: false,
  problem: '',
  problemLength: 0,
  submissionUserId: '',
  submissionUserNickName: '',
  isPass: false,
  isOver: false
};

const quiz = (state = initialState, action) => {
  const {
    type,
    problem,
    problemLength,
    submissionUserId,
    submissionUserNickName
  } = action;
  const newQuiz = cloneDeep(state);

  switch (type) {
    case 'PROBLEM_SUBMISSION_INFO_SETTINGS':
      newQuiz.problem = problem;

      return newQuiz;
    case 'PROBLEM_INFO_SETTINGS':
      newQuiz.isStart = true;
      newQuiz.problemLength = problemLength;
      newQuiz.submissionUserId = submissionUserId;
      newQuiz.submissionUserNickName = submissionUserNickName;

      return newQuiz;
    case 'GAME_OVER':
      newQuiz.isStart = false;
      newQuiz.isOver = true;

      return newQuiz;
    default:
      return state;
  }
};

export default quiz;
