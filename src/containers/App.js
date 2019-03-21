import { connect } from 'react-redux';
import {
  userInfoSettings,
  userListSettings,
  problemSubmissionInfoSettings,
  problemInfoSettings
} from '../actions';
import App from '../components/App/App';
import io from 'socket.io-client';
let socket;

const mapStateToProps = (state) => {
  console.log(state);
  return {...state, socket};
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
