import {
  COLOR_SETTINGS,
  CORRECT,
  CLOSE_POPUP,
  GAME_OVER,
  INITIAL_TIME_COUNT,
  INITIALIZE_CORRECT_ANSWER_INFORMATION,
  OPEN_POPUP,
  PROBLEM_SUBMISSION_INFO_SETTINGS,
  PROBLEM_INFO_SETTINGS,
  RECEIVE_MESSAGE,
  SET_TIMER,
  SET_TIME_COUNT,
  TIME_OUT,
  USER_ENTERED,
  USER_INFO_SETTINGS,
  USER_LIST_SETTINGS
} from './actionTypes';

export const userEntered = (user) => ({
  type: USER_ENTERED,
  user
});

export const userInfoSettings = (id) => ({
  type: USER_INFO_SETTINGS,
  id
});

export const userListSettings = (users) => ({
  type: USER_LIST_SETTINGS,
  users
});

export const problemSubmissionInfoSettings = (problem) => ({
  type: PROBLEM_SUBMISSION_INFO_SETTINGS,
  problem
});

export const problemInfoSettings = (userId, userNickName, problemLength) => ({
  type: PROBLEM_INFO_SETTINGS,
  problemLength,
  submissionUserId: userId,
  submissionUserNickName: userNickName
});

export const receiveMessage = (id, message) => ({
  type: RECEIVE_MESSAGE,
  id,
  message
});

export const colorSettings = (color) => ({
  type: COLOR_SETTINGS,
  color
});

export const correctAnswer = (id, solution, nickname) => ({
  type: CORRECT,
  id,
  solution,
  nickname
});

export const initializeCorrectAnswerInformation = () => ({
  type: INITIALIZE_CORRECT_ANSWER_INFORMATION
});

export const openPopup = () => ({
  type: OPEN_POPUP
});

export const closePopup = () => ({
  type: CLOSE_POPUP
});

export const gameOver = () => ({
  type: GAME_OVER
});

export const setTimeCount = (timer) => ({
  type: SET_TIME_COUNT,
  timer
});

export const timeOut = () => ({
  type: TIME_OUT
});

export const initialTimeCount = () => ({
  type: INITIAL_TIME_COUNT
});

export const setTimer = (time) => ({
  type: SET_TIMER,
  time
});
