import React, { Component } from 'react';
import { GameWrap, LogoWrap, Title } from '../StyledComponents';
import { QuizHeader } from './QuizHeader';
import ThreeScene from './ThreeScene';
import ColorPicker from './ColorPicker';
import Users from './Users';
import Chat from './Chat';

class Game extends Component {
  constructor(props) {
    super(props);
    this.countStart = false;
  }

  componentDidMount() {
    const { socket, onSetTimer, receiveMessage, onCorrectAnswer, onGameOver, onTimeOut } = this.props;

    socket.on('message', ({ id, message }) => {
      receiveMessage(id, message);
    });

    socket.on('pass', ({ id, solution, userNickName, users }) => {
      onCorrectAnswer(id, solution, userNickName, users);
    });

    socket.on('time out', () => {
      onTimeOut();
    });

    socket.on('end', (users) => {
      onGameOver(users);
    });

    socket.on('time counter', (time) => {
      onSetTimer(time);
    });
  }

  render() {
    const {
      users,
      isStart,
      onChangeColor,
      colors,
      color,
      onSubmitMessage,
      submissionUserId,
      id,
      time,
      createCube,
      socket,
      isPass,
      isTimeout,
      quizKeywordLength,
      quizKeyword,
      removeCube
    } = this.props;

    return (
      <GameWrap>
        <LogoWrap>
          <Title color="#181818">
            butter<br/>
            block.
          </Title>
        </LogoWrap>
        {
          isStart
          && (
            <QuizHeader
              time={time}
              keyword={quizKeyword}
              keywordLength={quizKeywordLength}
              submissionUserId={submissionUserId}
              id={id}
            />
          )
        }
        {
          (submissionUserId === id)
          && <ColorPicker colors={colors} onChangeColor={onChangeColor} color={color} />
        }
        <ThreeScene
          isStart={isStart}
          color={color}
          submissionUserId={submissionUserId}
          id={id}
          createCube={createCube}
          removeCube={removeCube}
          socket={socket}
          isPass={isPass}
          isTimeout={isTimeout}
        />
        <Chat id={id} onSubmitMessage={onSubmitMessage} />
        <Users users={users} socket={socket} submissionUserId={submissionUserId} id={id} />
      </GameWrap>
    );
  }
}

export default Game;
