import React, { Component } from 'react';
import './App.scss';
import Login from '../block/Login';

class App extends Component {
  render() {
    return (
      <Login onClickLogin={this.props.onLogin} />
    );
  }
}

export default App;
