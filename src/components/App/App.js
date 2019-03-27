import React, { Component, Fragment } from 'react';
import './App.scss';
import Login from '../Login';
import Game from '../Game';
import { Popup } from '../Popup';
import bgSound from '../../audio/bg.mp3';
import correctSound from '../../audio/correct.mp3';

class App extends Component {
  render() {
    const {
      user,
      onLogin,
      users,
      quiz,
      createCube,
      removeCube,
      socket,
      onSubmitMessage,
      receiveMessage,
      onChangeColor,
      onCorrectAnswer,
      screen,
      correct,
      isPass,
      isTimeout,
      onGameOver,
      gameResult,
      onTimeOut,
      onStartTimeCounter,
      onSetTimer,
      popup
    } = this.props;
    const {
      isStart,
      isOver,
      time,
      submissionUserId,
      submissionUserNickName,
      problem,
      problemLength
    } = quiz;
    const { id } = user;
    const { color, colors } = screen;
    const { correctNickName, quizSolution } = correct;

    return (
      <Fragment>
        {/* <audio src={bgSound} loop autoPlay /> */}
        { isPass && <audio src={correctSound} autoPlay /> }
        {
          user.id
            ? <Game
                createCube={createCube}
                color={color}
                colors={colors}
                users={users}
                id={id}
                isStart={isStart}
                isTimeout={isTimeout}
                isTimeout={isTimeout}
                isPass={isPass}
                submissionUserId={submissionUserId}
                socket={socket}
                removeCube={removeCube}
                time={time}
                receiveMessage={receiveMessage}
                onTimeOut={onTimeOut}
                onStartTimeCounter={onStartTimeCounter}
                onCorrectAnswer={onCorrectAnswer}
                onSubmitMessage={onSubmitMessage}
                onChangeColor={onChangeColor}
                onGameOver={onGameOver}
                onSetTimer={onSetTimer}
                quizKeywordLength={problemLength}
                quizKeyword={problem}
              />
            : <Login onClickLogin={onLogin} />
        }
        {
          popup
          && <Popup
              submissionUserNickName={submissionUserNickName}
              correctNickName={correctNickName}
              quizSolution={quizSolution}
              submissionUserId={submissionUserId}
              id={id}
              isOver={isOver}
              gameResult={gameResult}
            />
        }
      </Fragment>
    );
  }
}

export default App;
