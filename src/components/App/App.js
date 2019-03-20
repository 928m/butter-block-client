import React, { Component, Fragment } from 'react';
import './App.scss';
import Login from '../block/Login';
// import Game from '../Game';

class Game extends Component {
  render() {
    const { users } = this.props;
    return users.map((name, index) => <div key={`${name}${index}`}>{name}</div>);
  }
}

class App extends Component {
  render() {
    const { user, onLogin, users } = this.props;

    return (
      <Fragment>
        {
          user.id
            ? <Game users={users} />
            : <Login onClickLogin={onLogin} />
        }
      </Fragment>
    );
  }
}

export default App;
