import React from 'react';
import { PopContent, PopupTitle, WinnerArea, GameScoreList } from '../StyledComponents';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import Cube from '../elements/Cube';

library.add(faCrown);

export const WinnerPopup = (props) => {
  const { gameResult } = props;

  return (
    <PopContent>
      <PopupTitle>game over</PopupTitle>
      <WinnerArea>
        <FontAwesomeIcon icon="crown" className="icon" />
        <span>{gameResult[0].nickname}</span>
      </WinnerArea>
      <GameScoreList>
        {
          gameResult.map((user) => (
            <li key={user.id}>
              <Cube />
              <span>{user.nickname}</span>
              <em className="score">{user.score}</em>
            </li>
          ))
        }
      </GameScoreList>
    </PopContent>
  );
};
