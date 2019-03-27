import React, { Component } from 'react';
import { TimerBox } from '../StyledComponents';

class Timer extends Component {
  render() {
    const { time } = this.props;
    let min = Math.floor(time / 60000);
    let sec = time % 60000 / 1000;

    min = (min < 10) ? `0${min}` : min;
    sec = (sec < 10) ? `0${sec}` : sec;

    return (
      <TimerBox color={`${time >= (1000 * 30) ? '#2777CE' : '#F44336'}`}>
        <span>{min}</span>:<span>{sec}</span>
      </TimerBox>
    );
  }
}

export default Timer;
