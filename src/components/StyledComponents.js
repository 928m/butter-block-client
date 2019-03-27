import styled from 'styled-components';

export const GameWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 1200px;
  width: 100%;
  height: 100vh;
`;

export const Button = styled.button`
  display: block;
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 500;
  color: #181818;
  background: #ffffff;
  border-radius: 5px;
  transition: all .5s;

  &:focus,
  &:hover {
    box-shadow: 0 0 15px #ffffff;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 0;
  margin: 0 0 60px;
  font-size: 20px;
  text-align: center;
  background: transparent;
  color: #ffffff;
  font-weight: 500;
  text-shadow: 0 0 5px rgba(255, 255, 255, .7);
  transition: box-shadow .5s;

  &:focus {
    box-shadow: 0 3px 0 #ffffff;
  }
`;

export const Notice = styled.p`
  display: block;
  width: 200px;
  font-size: 14px;
  line-height: 30px;
  border-radius: 30px;
  color: #ffffff;
  text-align: center;
  margin: 0 0 50px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 1);
  animation: opacity .5s;

  @keyframes opacity {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LoginWrap = styled.section`
  width: 100%;
  height: 100vh;
  background: #000000;
`;

export const LoginCont = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  justify-content: center;
`;

export const LogoWrap = styled.div`
  position: fixed;
  top: 50px;
  left: 50px;
  transform: scale(.8);
  color: #181818;
`;

export const PopupWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: linear-gradient(0, rgba(0,0,0,.5) 0%, #000000 104%);
  color: #ffffff;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  animation: popup 1s;

  p {
    width: 100%;
  }

  @keyframes popup {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

export const PopupInner = styled.div`
  padding: 50px;
  border-radius: 20px;
  background: rgba(255, 255, 255, .7);
  color: #181818;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
`;

export const PopContent = styled.div`
  display: flex;
  min-width: 150px;
  flex-wrap: wrap;
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  position: relative;

  .quizSolutionKeyword {
    text-align: center;
    font-weight: 500;
    margin: 0 0 30px;
  }

  .cube-wrap {
    transform: translateX(50%);
  }

  ul {
    display: flex;
    width: 100%;

    li {
      min-width: 130px;
      text-align: center;

      .icon {
        display: inline-block;
        font-size: 30px;
        padding: 10px;
        color: #181818;
        border: 3px solid #181818;
        border-radius: 5px;
      }

      span {
        display: block;
        text-align: center;
        font-size: 12px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 10px 0 0;
      }

      b {
        display: inline-block;
        text-align: center;
        line-height: 20px;
        font-size: 13px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 10px 0 0;
        background: #f6d365;
        padding: 0 5px;
      }
    }
  }

  .quiz-owner {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    justify-content: center;

    .cube-wrap {
      transform: scale(0.7) translateX(40px);
      margin: 0 0 15px;
    }

    span {
      display: inline-block;
      font-size: 20px;
      font-weight: 700;
      width: 100%;
      text-align: center;
      color: #494e51;
      letter-spacing: 2px;
    }
  }

  .correctUser {
    padding: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;

    .cube-wrap {
      transform: translate(50%, 17px);
    }

    p {
      font-weight: 700;
      font-size: 30px;
      letter-spacing: 3px;
      margin: 50px 0 0;
    }
  }
`;

export const PopupTitle = styled.h1`
  font-size: 15px;
  font-weight: 700;
  padding: 0 25px;
  line-height: 40px;
  color: #ffffff;
  border-radius: 40px;
  letter-spacing: 3px;
  background: linear-gradient(145deg, #f6d365, #fda085);
  color: #ffffff;
  text-transform: uppercase;
  position: fixed;
  top: -20px;
  left: 50%;
  transform: translate(-50%);
`;

export const GameScoreList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    border-top: 1px solid #cccccc;

    .cube-wrap {
      flex-grow: 2;
    }

    &:first-child {
      border-top: 0;

      .cube-wrap { transform: scale(.7) translateX(50%); }
      .score {
        font-size: 40px;
        color: #ffffff;
        text-shadow: 2px 2px 0 #ffd684,
        4px 4px 0 #fbbc05,
        6px 6px 0 #e8b64c;
      }
    }
    &:nth-child(2) {
      .cube-wrap { transform: scale(.6) translateX(50%); }
    }
    &:nth-child(3) {
      .cube-wrap { transform: scale(.5) translateX(50%); }
    }

    span {
      flex-grow: 5;
    }

    .score {
      flex-grow: 3;
      font-style: normal;
      font-weight: 700;
    }
  }
`;

export const WinnerArea = styled.div`
  margin: 0 0 50px;
  position: relative;

  .icon { margin: 0 10px 0 0; }

  span {
    font-size: 30px;
    font-weight: 700;
  }
`;

export const QuizHeaderWrap = styled.div`
  display: block;
  min-width: 250px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%);
`;

export const TimerBox = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.color};
  background: transparent;
  text-align: center;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  line-height: 50px;
  border-radius: 10px;
  letter-spacing: 2px;
`;

export const Colors = styled.ul`
  position: fixed;
  top: 40px;
  left: 40px;
  z-index: 100;
`;

export const ColorItem = styled.li`
  display: flex;
  overflow: hidden;
  padding: 10px;
  cursor: pointer;
  transition: all .5s;

  em {
    display: inline-block;
    font-size: 8px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 2px;
    font-style: normal;
    line-height: 40px;
    opacity: 0;
    transition: all .5s;
  }

  &:before {
    display: inline-block;
    content: '';
    width: 40px;
    height: 40px;
    background: ${props => props.color};
    border-radius: 10px;
    box-shadow: 0 0 10px ${props => props.color};
    position: relative;
    z-index: 10;
    transition: all .5s;
  }

  &.on,
  &:hover {
    background: #ffffff;
    border-radius: 50px;

    &:before {
      border-radius: 50%;
      transform: rotate(45deg);
      box-shadow: 0 0 15px ${props => (props.color === '#ffffff') ? '#cccccc' : 'transparent'};
    }

    em {
      margin-left: 10px;
      opacity: 1;
    }
  }
`;

export const UserList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px 0;
  margin: 30px 0 0;
  position: relative;

  &:first-child {
    margin-top: 0;
  }

  &.me {
    span {
      display: block;
      text-align: center;
      position: relative;

      &:before {
        display: inline-block;
        content: 'me';
        background: #181818;
        font-size: 8px;
        font-weight: 500;
        padding: 5px;
        color: #ffffff;
        border-radius: 4px;
        margin: 0 10px 0 0;
      }
    }
  }

  &.on {
    &:before {
      display: block;
      content: '';
      width: 120px;
      height: 120px;
      border-top: 5px solid #ff3aa6;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-radius: 50%;
      position: absolute;
      top: -5px;
      left: 30%;
      opacity: .5;
      animation: rt 2s infinite linear;
    }

    @keyframes rt {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .cube-wrap {
    display: inline-block;
    transform: scale(0.7) translateX(50%);
    animation: enter .6s ease-in-out;
  }

  @keyframes enter {
    0% {
      transform: scale(0.1) translateX(50%);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    80% {
      transform: scale(0.8) translateX(50%);
    }
    100% {
      transform: scale(0.7) translateX(50%);
    }
  }

  span {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    margin: 10px 0 0;
  }

  .score {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    display: inline-block;
    line-height: 30px;
    color: #ffffff;
    border-radius: 25px 25px 0 25px;
    background: #ff7754;
    text-align: center;
    padding: 0 10px;
    position: absolute;
    top: 0;
    left: 30px;
  }
`;

export const Keyword = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  min-width: 250px;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 3px;
  border-radius: 0 0 20px 20px;
  background: rgba(0,0,0,.8);
  color: #ffffff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .1);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

export const MessageContent = styled.p`
  display: block;
  position: absolute;
  top: 30%;
  right: 80%;
  z-index: 100;
  padding: 10px 20px;
  font-size: 12px;
  border-radius: 15px 15px 0 15px;
  background: rgba(255, 255, 255, .5);
  color: #181818;
  font-weight: 700;
  animation: message .5s;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);

  @keyframes message {
    0% { transform: translateY(20px); }
    100% { transform: translateY(0); }
  }
`;

export const ChatWrap = styled.div`
  display: block;
  width: 40%;
  height: 50px;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);

  &:before {
    display: block;
    content: 'chat';
    line-height: 50px;
    text-transform: uppercase;
    text-align: center;
    font-size: 10px;
    font-weight: 700;
    color: #000000;
    letter-spacing: 2px;
    position: absolute;
    top: 0;
    left: 20px;
    z-index: 30;
  }

  &:after {
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #000000;
    position: absolute;
    top: 50%;
    left: -3px;
    z-index: 20;
    transform: translateY(-50%);
  }
`;

export const ChatInput = styled.input`
  display: block;
  width: 100%;
  height: 50px;
  font-size: 13px;
  padding: 0 30px 0 70px;
  box-sizing: border-box;
  border-radius: 15px;
  font-weight: 500;
  color: #999999;
  background: rgba(255, 255, 255, .8);
  box-shadow: 0 3px 5px rgba(0, 0, 0, .05);
  position: relative;
  z-index: 10;
  transition: all .5s;

  &:focus {
    background: rgba(252, 220, 75, .7);
    color: #000000;
  }

  &::placeholder {
    text-transform: uppercase;
    text-align: center;
    color: #cccccc;
  }
`;
