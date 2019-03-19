import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import axios from 'axios';
// import {} from '../actions';
import App from '../components/App/App';
// import io from 'socket.io-client';
// const socket = io('http://localhost:8081');
// socket.emit('chat message', 'minjihee89');

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin(value) {
      console.log(value.trim());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
