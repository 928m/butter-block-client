import { cloneDeep } from 'lodash';

const initialState = {
  nickname: '',
  id: '',
  solution: '',
  isPass: false
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
    case 'CORRECT':
      newCorrect.nickname = nickname;
      newCorrect.id = id;
      newCorrect.solution = solution;
      newCorrect.isPass = true;

      return newCorrect;
    case 'INITIALIZE_CORRECT_ANSWER_INFORMATION':
      return initialState;
    default:
      return state;
  }
};

export default correct;
