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
  openPopup
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
  const users = userList.map((user) => ({
    id: user.id,
    nickname: user.nickname,
    message: chat[user.id]
  }));

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
    socket,
    popup
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin(name) {
      socket = io('http://localhost:8081');

      socket.emit('user', name);

      socket.on('order', ({ id, order }) => {
        dispatch(userInfoSettings(id, order));
      });

      socket.on('users', (users) => {
        dispatch(userListSettings(users));
      });

      socket.on('start', ({ userId, userNickName, problemLength }) => {
        dispatch(problemInfoSettings(userId, userNickName, problemLength));
        dispatch(openPopup());

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
    onCorrectAnswer(id, solution, userNickName) {
      dispatch(correctAnswer(id, solution, userNickName));
      dispatch(openPopup());

      setTimeout(() => {
        dispatch(closePopup());
        dispatch(initializeCorrectAnswerInformation());
      }, 4000);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
