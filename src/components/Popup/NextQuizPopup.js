import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCubes,
  faSyncAlt,
  faPalette,
  faEraser
} from '@fortawesome/free-solid-svg-icons';
import { PopContent, PopupTitle } from '../StyledComponents';
import Cube from '../elements/Cube';

library.add(faCubes);
library.add(faSyncAlt);
library.add(faPalette);
library.add(faEraser);

export const NextQuizPopup = (props) => {
  const {
    id,
    submissionUserId,
    submissionUserNickName
  } = props;

  return (
    <PopContent>
        <PopupTitle>
          { (submissionUserId === id) ? 'how to use' : 'drawer' }
        </PopupTitle>
        {
          (submissionUserId === id)
          ? (
            <ul>
              <li>
                <FontAwesomeIcon icon="cubes" className="icon" />
                <span>create</span>
                <b>click</b>
              </li>
              <li>
                <FontAwesomeIcon icon="eraser" className="icon" />
                <span>remove</span>
                <b>right click</b>
              </li>
              <li>
                <FontAwesomeIcon icon="sync-alt" className="icon" />
                <span>rotate</span>
                <b>drag</b>
              </li>
              <li>
                <FontAwesomeIcon icon="palette" className="icon" />
                <span>color</span>
              </li>
            </ul>
          )
          : (
            <div className="quiz-owner">
              <Cube />
              <span>{submissionUserNickName}</span>
            </div>
          )
        }
      </PopContent>
  );
};
