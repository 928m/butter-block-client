import { connect } from 'react-redux';
import {
  userInfoSettings,
  userListSettings,
  problemSubmissionInfoSettings,
  problemInfoSettings,
  receiveMessage,
  colorSettings,
  correctAnswer,
  initializeCorrectAnswerInformation,
  closePopup,
  openPopup,
  gameOver,
  setTimer,
  initialTimeCount,
  timeOut
} from '../actions';
import App from '../components/App/App';
import io from 'socket.io-client';
let socket;

const mapStateToProps = (state) => {
  const {
    chat,
    quiz,
    user,
    screen,
    correct,
    popup
  } = state;
  const userList = state.users;
  const isPass = correct.isPass;
  const isTimeout = correct.isTimeout;
  const users = Object.keys(userList).map((key) => {
    const user = userList[key];

    return {
      id: user.id,
      nickname: user.nickname,
      message: chat[user.id],
      score: user.score
    };
  });
  const gameResult = users.sort((currentUser, nextUser) => nextUser.score - currentUser.score);

  correct.correctUserId = correct.id;
  correct.correctNickName = correct.nickname;
  correct.quizSolution = correct.solution;

  return {
    chat,
    quiz,
    user,
    users,
    screen,
    correct,
    isPass,
    isTimeout,
    socket,
    gameResult,
    popup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin(name) {
      // socket = io('http://localhost:8081');
      socket = io('http://192.168.0.48:8081');

      socket.emit('user', name);

      socket.on('user id', (id) => {
        dispatch(userInfoSettings(id));
      });

      socket.on('users', (users) => {
        dispatch(userListSettings(users));
      });

      socket.on('start', ({ userId, userNickName, problemLength }) => {
        dispatch(problemInfoSettings(userId, userNickName, problemLength));
        dispatch(openPopup());
        dispatch(initialTimeCount());

        setTimeout(() => {
          dispatch(closePopup());
        }, 4000);
      });

      socket.on('submission', (problem) => {
        dispatch(problemSubmissionInfoSettings(problem));
      });
    },
    createCube(cubeObj) {
      socket.emit('create cube', cubeObj);
    },
    removeCube(removeCubeIndex) {
      socket.emit('remove cube', removeCubeIndex);
    },
    onSubmitMessage(id, message) {
      socket.emit('message', { id, message });
    },
    receiveMessage(id, message) {
      dispatch(receiveMessage(id, message));

      setTimeout(() => {
        dispatch(receiveMessage(id));
      }, 2000);
    },
    onChangeColor(color) {
      dispatch(colorSettings(Number(color)));
    },
    onCorrectAnswer(id, solution, userNickName, users) {
      dispatch(correctAnswer(id, solution, userNickName));
      dispatch(userListSettings(users));
      dispatch(openPopup());

      setTimeout(() => {
        dispatch(closePopup());
        dispatch(initializeCorrectAnswerInformation());
      }, 4000);
    },
    onTimeOut() {
      dispatch(timeOut());
    },
    onGameOver(users) {
      dispatch(userListSettings(users));
      dispatch(gameOver());
      dispatch(openPopup());
    },
    onSetTimer(time) {
      dispatch(setTimer(time));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
