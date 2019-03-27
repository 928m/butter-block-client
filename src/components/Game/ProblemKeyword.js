import React from 'react';
import { Keyword } from '../StyledComponents';

export const ProblemKeyword = (props) => {
  const { keyword, keywordLength, submissionUserId, id } = props;
  return (
    <Keyword>
      {
        (keyword && submissionUserId === id)
          ? `${keyword}`
          : `keyword length is ${keywordLength}.`
      }
    </Keyword>
  );
};
