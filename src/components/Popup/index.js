import React from 'react';
import { PopupWrap, PopupInner } from '../StyledComponents';
import { QuizCorrectPopup } from './QuizCorrectPopup';
import { NextQuizPopup } from './NextQuizPopup';
import { WinnerPopup } from './WinnerPopup';

export const Popup = (props) => {
  const {
    id,
    isOver,
    correctNickName,
    gameResult,
    submissionUserNickName,
    submissionUserId,
    quizSolution
  } = props;

  return (
    <PopupWrap>
      <PopupInner>
        {
          isOver
            ? <WinnerPopup gameResult={gameResult} />
            : (
              correctNickName
              ? <QuizCorrectPopup
                  quizSolution={quizSolution}
                  correctNickName={correctNickName}
                />
              : <NextQuizPopup
                  id={id}
                  submissionUserId={submissionUserId}
                  submissionUserNickName={submissionUserNickName}
                />
            )
        }
      </PopupInner>
    </PopupWrap>
  );
};
