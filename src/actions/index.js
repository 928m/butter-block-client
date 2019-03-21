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
