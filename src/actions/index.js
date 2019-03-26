export const userEntered = (user) => {
  return {
    type: 'USER_ENTERED',
    user
  };
};

export const userInfoSettings = (id) => {
  return {
    type: 'USER_INFO_SETTINGS',
    id
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

export const problemInfoSettings = (userId, userNickName, problemLength) => {
  return {
    type: 'PROBLEM_INFO_SETTINGS',
    problemLength,
    submissionUserId: userId,
    submissionUserNickName: userNickName
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

export const openPopup = () => {
  return {
    type: 'OPEN_POPUP'
  };
};

export const closePopup = () => {
  return {
    type: 'CLOSE_POPUP'
  };
};

export const gameOver = () => {
  return {
    type: 'GAME_OVER'
  };
};

export const setTimeCount = (timer) => {
  return {
    type: 'SET_TIME_COUNT',
    timer
  }
};

export const timeOut = () => {
  return {
    type: 'TIME_OUT'
  }
};

export const initialTimeCount = () => {
  return {
    type: 'INITIAL_TIME_COUNT'
  };
};

export const setTimer = (time) => {
  return {
    type: 'SET_TIMER',
    time
  };
};
