export const userEntered = (user) => {
  return {
    type: 'USER_ENTERED',
    user
  };
};

export const userInfoSettings = (id, order) => {
  return {
    type: 'USER_INFO_SETTINGS',
    id,
    order
  }
};

export const userListSettings = (users) => {
  return {
    type: 'USER_LIST_SETTINGS',
    users
  }
};

export const problemSubmissionInfoSettings = (problem) => {
  return {
    type: 'PROBLEM_SUBMISSION_INFO_SETTINGS',
    problem
  };
};

export const problemInfoSettings = (problemLength, userId) => {
  return {
    type: 'PROBLEM_INFO_SETTINGS',
    problemLength,
    submissionUser: userId
  };
};

export const receiveMessage = (id, message) => {
  return {
    type: 'RECEIVE_MESSAGE',
    id,
    message
  };
};

export const colorSettings = (color) => {
  return {
    type: 'COLOR_SETTINGS',
    color
  };
};

export const correctAnswer = (id, solution, nickname) => {
  return {
    type: 'CORRECT',
    id,
    solution,
    nickname
  };
};

export const initializeCorrectAnswerInformation = () => {
  return {
    type: 'INITIALIZE_CORRECT_ANSWER_INFORMATION'
  };
};
