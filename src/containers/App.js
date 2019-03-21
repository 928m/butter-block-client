import { connect } from 'react-redux';
import {
  userInfoSettings,
  userListSettings,
  problemSubmissionInfoSettings,
  problemInfoSettings,
  receiveMessage,
  colorSettings
} from '../actions';
import App from '../components/App/App';
import io from 'socket.io-client';
let socket;

const mapStateToProps = (state) => {
  const {
    chat,
    quiz,
    user,
    screen
  } = state;
  const userList = state.users;

  const users = userList.map((user) => {
    return {
      id: user.id,
      nickname: user.nickname,
      message: chat[user.id]
    };
  });

  return {
    chat,
    quiz,
    user,
    users,
    screen,
    socket
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

      socket.on('start', ({ userId, problemLength }) => {
        dispatch(problemInfoSettings(problemLength, userId));
      });

      socket.on('submission', (problem) => {
        dispatch(problemSubmissionInfoSettings(problem));
      });
    },
    createCube(cubeObj) {
      socket.emit('create cube', cubeObj);
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
