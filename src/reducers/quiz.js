import { cloneDeep } from 'lodash';

const initialState = {
  isStart: false,
  problem: '',
  length: 0,
  submissionUser: '',
  isPass: false
};

const quiz = (state = initialState, action) => {
  const {
    type,
    problem,
    problemLength,
    submissionUser
  } = action;
  const newQuiz = cloneDeep(state);

  switch (type) {
    case 'PROBLEM_SUBMISSION_INFO_SETTINGS':
      newQuiz.isStart = true;
      newQuiz.problem = problem;

      return newQuiz;
    case 'PROBLEM_INFO_SETTINGS':
      newQuiz.isStart = true;
      newQuiz.problemLength = problemLength;
      newQuiz.submissionUser = submissionUser;

      return newQuiz;
    default:
      return state;
  }
};

export default quiz;
