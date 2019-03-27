import React from 'react';
import { PopContent, PopupTitle } from '../StyledComponents';
import Cube from '../elements/Cube';

export const QuizCorrectPopup = (props) => {
  const { quizSolution, correctNickName } = props;

  return (
    <PopContent>
      <PopupTitle>correct!</PopupTitle>
      <p className="quizSolutionKeyword">{quizSolution}</p>
      <div className="correctUser">
        <Cube />
        <p>{correctNickName}</p>
      </div>
    </PopContent>
  );
};
