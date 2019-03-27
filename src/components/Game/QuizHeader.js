import React from 'react';
import { ProblemKeyword } from './ProblemKeyword';
import { QuizHeaderWrap } from '../StyledComponents';
import Timer from './Timer';

export const QuizHeader = (props) => {
  return (
    <QuizHeaderWrap>
      <ProblemKeyword
        keyword={props.keyword}
        keywordLength={props.keywordLength}
        submissionUserId={props.submissionUserId}
        id={props.id}
      />
      <Timer time={props.time} />
    </QuizHeaderWrap>
  );
};
